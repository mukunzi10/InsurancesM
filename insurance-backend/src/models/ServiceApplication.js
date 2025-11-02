const serviceApplicationSchema = new mongoose.Schema(
  {
    applicationNumber: {
      type: String,
      unique: true,
      index: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true
    },
    serviceName: {
      type: String,
      required: true
    },
    applicantInfo: {
      fullName: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
      },
      phone: {
        type: String,
        required: true,
        trim: true
      },
      dateOfBirth: Date,
      idNumber: String,
      address: String
    },
    additionalInfo: {
      message: String,
      preferredContactMethod: {
        type: String,
        enum: ['email', 'phone', 'both'],
        default: 'both'
      },
      preferredContactTime: {
        type: String,
        enum: ['morning', 'afternoon', 'evening', 'anytime'],
        default: 'anytime'
      }
    },
    documents: [{
      documentType: String,
      fileName: String,
      fileUrl: String,
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    }],
    status: {
      type: String,
      enum: [
        'Submitted',
        'Under Review',
        'Documents Required',
        'Approved',
        'Rejected',
        'Converted to Policy',
        'Cancelled'
      ],
      default: 'Submitted'
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' // Agent/Admin
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium'
    },
    notes: [{
      addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      note: String,
      addedAt: {
        type: Date,
        default: Date.now
      },
      isInternal: {
        type: Boolean,
        default: true
      }
    }],
    statusHistory: [{
      status: String,
      changedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      changedAt: {
        type: Date,
        default: Date.now
      },
      comment: String
    }],
    rejectionReason: String,
    policyNumber: String, // If converted to policy
    convertedAt: Date
  },
  {
    timestamps: true
  }
);

// Auto-generate application number
serviceApplicationSchema.pre('save', async function(next) {
  if (!this.isNew || this.applicationNumber) {
    return next();
  }

  try {
    const lastApp = await mongoose
      .model('ServiceApplication')
      .findOne({}, { applicationNumber: 1 })
      .sort({ createdAt: -1 })
      .lean();

    let nextNumber = 1;
    if (lastApp && lastApp.applicationNumber) {
      const match = lastApp.applicationNumber.match(/APP-(\d+)/);
      if (match) {
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }

    this.applicationNumber = `APP-${nextNumber.toString().padStart(6, '0')}`;
    next();
  } catch (error) {
    next(error);
  }
});

// Track status changes
serviceApplicationSchema.pre('save', function(next) {
  if (this.isModified('status') && !this.isNew) {
    this.statusHistory.push({
      status: this.status,
      changedAt: new Date()
    });
  }
  next();
});

// Indexes
serviceApplicationSchema.index({ user: 1, createdAt: -1 });
serviceApplicationSchema.index({ status: 1, priority: 1 });
serviceApplicationSchema.index({ assignedTo: 1 });
serviceApplicationSchema.index({ service: 1 });

// Instance methods
serviceApplicationSchema.methods.addNote = function(userId, noteText, isInternal = true) {
  this.notes.push({
    addedBy: userId,
    note: noteText,
    isInternal,
    addedAt: new Date()
  });
  return this.save();
};

serviceApplicationSchema.methods.approve = function(userId, comment) {
  this.status = 'Approved';
  this.statusHistory.push({
    status: 'Approved',
    changedBy: userId,
    changedAt: new Date(),
    comment: comment || 'Application approved'
  });
  return this.save();
};

serviceApplicationSchema.methods.reject = function(userId, reason) {
  this.status = 'Rejected';
  this.rejectionReason = reason;
  this.statusHistory.push({
    status: 'Rejected',
    changedBy: userId,
    changedAt: new Date(),
    comment: reason
  });
  return this.save();
};

serviceApplicationSchema.methods.convertToPolicy = function(userId, policyNumber) {
  this.status = 'Converted to Policy';
  this.policyNumber = policyNumber;
  this.convertedAt = new Date();
  this.statusHistory.push({
    status: 'Converted to Policy',
    changedBy: userId,
    changedAt: new Date(),
    comment: `Converted to policy: ${policyNumber}`
  });
  return this.save();
};

module.exports = mongoose.models.ServiceApplication || 
  mongoose.model('ServiceApplication', serviceApplicationSchema);