/**
 * Sanlam | Allianz Insurance Management System - Backend
 * Version: 2.1.0 (Express 5 Compatible)
 */

require('dotenv').config({ path: './.env' });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const { sanitizeRequest } = require('./src/middleware/sanitize');
const errorHandler = require('./src/middleware/errorHandler');
const connectDB = require('./src/config/database');

// =====================================================
// ⚙️ Environment Configuration
// =====================================================
const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  env: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI,
  frontendUrls: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3002',
    'http://127.0.0.1:3002',
  ],
};

// Validate critical env vars
['MONGODB_URI', 'JWT_SECRET'].forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

// =====================================================
// 🧱 Express App Initialization
// =====================================================
const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);

// =====================================================
// 📁 Ensure Required Directories Exist
// =====================================================
['temp', 'uploads', 'uploads/documents', 'uploads/images', 'logs'].forEach((dir) => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
});

// =====================================================
// 🗄️ Connect to MongoDB
// =====================================================
connectDB();

// =====================================================
// 🛡️ Security Middleware
// =====================================================
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false, // disable for APIs
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(sanitizeRequest); // XSS & Mongo sanitization

// =====================================================
// 🌐 CORS Setup
// =====================================================
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || config.frontendUrls.includes(origin)) return callback(null, true);
      console.warn(`⚠️  CORS blocked: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  })
);

// =====================================================
// ⚡ Compression
// =====================================================
app.use(compression());

// =====================================================
// 🧾 Logging
// =====================================================
if (config.env === 'development') {
  app.use(morgan('dev'));
} else {
  const logDir = path.join(__dirname, 'logs');
  const accessLog = fs.createWriteStream(path.join(logDir, 'access.log'), { flags: 'a' });
  app.use(morgan('combined', { stream: accessLog }));
}

// =====================================================
// 🧍‍♂️ Request ID
// =====================================================
app.use((req, res, next) => {
  req.id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  res.setHeader('X-Request-Id', req.id);
  next();
});

// =====================================================
// 🚦 Rate Limiting
// =====================================================
app.use(
  '/api/',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: config.env === 'development' ? 1000 : 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests, try again later.' },
  })
);

// =====================================================
// 🗂️ Static Files
// =====================================================
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// =====================================================
//  Routes
// =====================================================

const routes = [
  { path: '/api/auth', file: './src/routes/authRoutes' },
  { path: '/api/policies', file: './src/routes/policyRoutes' },
  { path: '/api/claims', file: './src/routes/claimRoutes' },
  { path: '/api/payments', file: './src/routes/paymentRoutes' },
  { path: '/api/complaints', file: './src/routes/complaintRoutes' },
  { path: '/api/feedback', file: './src/routes/feedbackRoutes' },
  { path: '/api/services', file: './src/routes/serviceRoutes' }
 
];

routes.forEach(({ path: routePath, file }) => {
  try {
    const route = require(file);
    app.use(routePath, route);
    console.log(`✅ Loaded route: ${routePath} from ${file}`);
  } catch (err) {
    console.error(`❌ Failed to load route ${routePath} from ${file}: ${err.message}`);
  }
});

// =====================================================
// 💡 Info & Health Endpoints
// =====================================================
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Sanlam | Allianz Insurance API',
    version: '2.1.0',
    status: 'Running',
    environment: config.env,
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    uptime: process.uptime(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString(),
  });
});

// =====================================================
// ❌ 404 Handler
// =====================================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    requestId: req.id,
  });
});

// =====================================================
// ⚠️ Global Error Handler
// =====================================================
app.use(errorHandler);

// =====================================================
// 🧘 Graceful Shutdown
// =====================================================
let server;
const shutdown = async (signal) => {
  console.log(`\n🛑 ${signal} received. Gracefully shutting down...`);
  if (server) {
    server.close(async () => {
      await mongoose.connection.close();
      console.log('🗄️ Database disconnected');
      process.exit(0);
    });
  }
};

['SIGTERM', 'SIGINT'].forEach((sig) => process.on(sig, () => shutdown(sig)));

// =====================================================
// 🚀 Start Server
// =====================================================
server = app.listen(config.port, () => {
  console.log('\n===================================================');
  console.log(`🚀 Server running on port ${config.port} (${config.env})`);
  console.log('===================================================');
  console.log(`📊 Health: http://localhost:${config.port}/health`);
  console.log(`🧭 API: http://localhost:${config.port}/api`);
  console.log(`🗄️  DB: ${mongoose.connection.readyState === 1 ? 'Connected ✅' : 'Disconnected ❌'}`);
  console.log('===================================================\n');
});

module.exports = app;
