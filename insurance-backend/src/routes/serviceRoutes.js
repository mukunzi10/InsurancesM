const express = require('express');
const router = express.Router();
const {
  // Client Operations
  getAllServices,
  getService,
  submitApplication,
  getMyApplications,
  hello,

  // Admin / Agent Operations
  getAllApplications,
  getApplication,
  assignApplication,
  addNote,
  approveApplication,
  rejectApplication,
  convertToPolicy,
  getApplicationStats,

  // Admin Service Management
  createService,
  updateService,
  deleteService
} = require('../controllers/serviceController');
const { protect, authorize } = require('../middleware/auth');
// ==========================================
// PUBLIC ROUTES
// ==========================================
router.get('/hello', hello);

// Get all services
router.get('/', getAllServices);

// Get single service
router.get('/:id', getService);

// ==========================================
// CLIENT ROUTES (Authenticated)
// ==========================================

// Submit service application
router.post('/applications', protect, authorize('client'), submitApplication);

// Get current user's applications
router.get('/applications/my-applications', protect, authorize('client'), getMyApplications);

// ==========================================
// ADMIN / AGENT ROUTES (Authenticated)
// ==========================================

// Get all applications
router.get('/applications', protect, authorize('admin', 'agent'), getAllApplications);

// Get single application
router.get('/applications/:id', protect, authorize('admin','agent','client'), getApplication);

// Assign application (admin or agent)
router.put('/applications/:id/assign', protect, authorize('admin','agent'), assignApplication);

// Add note to application
router.post('/applications/:id/notes', protect, authorize('admin','agent'), addNote);

// Approve application (admin only)
router.put('/applications/:id/approve', protect, authorize('admin'), approveApplication);

// Reject application (admin only)
router.put('/applications/:id/reject', protect, authorize('admin'), rejectApplication);

// Convert application to policy (admin only)
router.put('/applications/:id/convert', protect, authorize('admin'), convertToPolicy);

// Get application statistics (admin or agent)
router.get('/applications/stats', protect, authorize('admin','agent'), getApplicationStats);

// ==========================================
// ADMIN SERVICE MANAGEMENT ROUTES
// ==========================================

// Create service
router.post('/', protect, authorize('admin'), createService);

// Update service
router.put('/:id', protect, authorize('admin'), updateService);

// Delete service
router.delete('/:id', protect, authorize('admin'), deleteService);

module.exports = router;
