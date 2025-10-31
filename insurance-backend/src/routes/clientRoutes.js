

// ==================== CLIENT ROUTES ====================

const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

// Get all clients
router.get('/', async (req, res) => {
  try {
    const clients = await User.find({ role: 'client' })
      .select('-password')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: clients.length,
      data: clients
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get single client
router.get('/:id', async (req, res) => {
  try {
    const client = await User.findById(req.params.id).select('-password');

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    res.status(200).json({
      success: true,
      data: client
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update client
router.put('/:id', async (req, res) => {
  try {
    const client = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Client updated successfully',
      data: client
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Delete client
router.delete('/:id', async (req, res) => {
  try {
    const client = await User.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    await client.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Client deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;