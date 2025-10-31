const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

/**
 * Protect routes – verify JWT and attach user to request
 */
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  try {
    // Check for Bearer token in headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request, exclude password
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    // Token expired or invalid
    return res.status(401).json({ success: false, message: 'Not authorized, token invalid or expired', error: error.message });
  }
});

/**
 * Role-based authorization middleware
 * Usage: authorize('admin', 'manager')
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authorized, user missing' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role '${req.user.role}' not authorized to access this resource`
      });
    }

    next();
  };
};

/**
 * Convenience middleware for admin-only routes
 */
exports.adminOnly = exports.authorize('admin');
