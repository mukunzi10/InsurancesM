const express = require('express');
const {
  getAllClaims,
  getMyClaims,
  getClaim,
  submitClaim,
  updateClaim,
  reviewClaim,
  deleteClaim,
  getClaimStats
} = require('../controllers/claimController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// User routes
router.get('/my-claims', getMyClaims);
router.post('/', submitClaim);

// Admin routes
router.get('/stats', authorize('admin'), getClaimStats);
router.get('/', authorize('admin', 'agent'), getAllClaims);

// Claim specific routes
router.route('/:id')
  .get(getClaim)
  .put(updateClaim)
  .delete(authorize('admin'), deleteClaim);

router.put('/:id/review', authorize('admin'), reviewClaim);

module.exports = router;