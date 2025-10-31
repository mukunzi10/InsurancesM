const  mongoose=require( "mongoose");

const complaintSchema = new mongoose.Schema(
  {
    complaintNumber: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // must be 'user'
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Claims", "Billing", "Documentation", "Technical", "Customer Service", "Other"],
    },
    policyNumber: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved", "Closed"],
      default: "Open",
    },
    response: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Complaint || mongoose.model("Complaint", complaintSchema);
