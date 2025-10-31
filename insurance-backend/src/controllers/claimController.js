const Claim = require('../models/Claim');
const Policy = require('../models/Policy');

// @desc    Get all claims
// @route   GET /api/claims
// @access  Private (Admin)
exports.getAllClaims = async (req, res) => {
  try {
    const { status, type, priority } = req.query;
    let query = {};

    if (status) query.status = status;
    if (type) query.claimType = type;
    if (priority) query.priority = priority;

    const claims = await Claim.find(query)
      .populate('policy', 'policyNumber type')
      .populate('claimant', 'firstName lastName email phone')
      .populate('reviewedBy', 'firstName lastName')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: claims.length,
      data: claims
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user's claims
// @route   GET /api/claims/my-claims
// @access  Private
exports.getMyClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ claimant: req.user.id })
      .populate('policy', 'policyNumber type premium')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: claims.length,
      data: claims
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single claim
// @route   GET /api/claims/:id
// @access  Private
exports.getClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id)
      .populate('policy', 'policyNumber type premium coverage')
      .populate('claimant', 'firstName lastName email phone idNumber')
      .populate('reviewedBy', 'firstName lastName email');

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: 'Claim not found'
      });
    }

    // Check authorization
    if (claim.claimant._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this claim'
      });
    }

    res.status(200).json({
      success: true,
      data: claim
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Submit new claim
// @route   POST /api/claims
// @access  Private
exports.submitClaim = async (req, res) => {
  try {
    // Verify policy exists and belongs to user
    const policy = await Policy.findById(req.body.policy);

    if (!policy) {
      return res.status(404).json({
        success: false,
        message: 'Policy not found'
      });
    }

    if (policy.holder.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to submit claim for this policy'
      });
    }

    if (policy.status !== 'Active') {
      return res.status(400).json({
        success: false,
        message: 'Cannot submit claim for inactive policy'
      });
    }

    // Create claim
    const claim = await Claim.create({
      ...req.body,
      claimant: req.user.id
    });

    const populatedClaim = await Claim.findById(claim._id)
      .populate('policy', 'policyNumber type')
      .populate('claimant', 'firstName lastName email phone');

    res.status(201).json({
      success: true,
      message: 'Claim submitted successfully',
      data: populatedClaim
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update claim
// @route   PUT /api/claims/:id
// @access  Private
exports.updateClaim = async (req, res) => {
  try {
    let claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: 'Claim not found'
      });
    }

    // Only claimant can update if status is Pending
    if (claim.claimant.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this claim'
      });
    }

    if (claim.status !== 'Pending' && req.user.role !== 'admin') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update claim after it has been reviewed'
      });
    }

    claim = await Claim.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('policy', 'policyNumber type')
      .populate('claimant', 'firstName lastName email');

    res.status(200).json({
      success: true,
      message: 'Claim updated successfully',
      data: claim
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Review claim (Approve/Reject)
// @route   PUT /api/claims/:id/review
// @access  Private (Admin)
exports.reviewClaim = async (req, res) => {
  try {
    const { status, approvedAmount, adminNotes } = req.body;

    const claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: 'Claim not found'
      });
    }

    // Update claim with review
    claim.status = status;
    claim.reviewedBy = req.user.id;
    claim.reviewDate = Date.now();
    claim.adminNotes = adminNotes;

    if (status === 'Approved' && approvedAmount) {
      claim.approvedAmount = approvedAmount;
    }

    if (status === 'Paid') {
      claim.paymentDate = Date.now();
    }

    await claim.save();

    const updatedClaim = await Claim.findById(claim._id)
      .populate('policy', 'policyNumber type')
      .populate('claimant', 'firstName lastName email phone')
      .populate('reviewedBy', 'firstName lastName');

    res.status(200).json({
      success: true,
      message: `Claim ${status.toLowerCase()} successfully`,
      data: updatedClaim
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete claim
// @route   DELETE /api/claims/:id
// @access  Private (Admin)
exports.deleteClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: 'Claim not found'
      });
    }

    await claim.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Claim deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get claim statistics
// @route   GET /api/claims/stats
// @access  Private (Admin)
exports.getClaimStats = async (req, res) => {
  try {
    const total = await Claim.countDocuments();
    const pending = await Claim.countDocuments({ status: 'Pending' });
    const underReview = await Claim.countDocuments({ status: { $in: ['Under Review', 'Investigation'] } });
    const approved = await Claim.countDocuments({ status: { $in: ['Approved', 'Paid'] } });
    const rejected = await Claim.countDocuments({ status: 'Rejected' });

    // Total claim amount
    const totalClaimAmount = await Claim.aggregate([
      { $group: { _id: null, total: { $sum: '$claimAmount' } } }
    ]);

    // Approved claim amount
    const approvedClaimAmount = await Claim.aggregate([
      { $match: { status: { $in: ['Approved', 'Paid'] } } },
      { $group: { _id: null, total: { $sum: '$approvedAmount' } } }
    ]);

    // Claims by type
    const byType = await Claim.aggregate([
      {
        $group: {
          _id: '$claimType',
          count: { $sum: 1 },
          totalAmount: { $sum: '$claimAmount' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        total,
        pending,
        underReview,
        approved,
        rejected,
        totalClaimAmount: totalClaimAmount[0]?.total || 0,
        approvedClaimAmount: approvedClaimAmount[0]?.total || 0,
        byType
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};