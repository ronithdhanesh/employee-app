const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employees",
      required: [true, "Leave request must belong to an employee"],
    },

    leaveType: {
      type: String,
      required: [true, "Leave type is required"],
      enum: ["Sick", "Annual", "Casual", "Maternity", "Paternity", "Unpaid"],
    },

    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },

    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    reason: {
      type: String,
      trim: true,
      maxLength: [500, "Reason text cannot exceed 500 characters"],
    }
  },
  {
    timestamps: true,
  }
);

const LeaveModel = mongoose.model("Leave", LeaveSchema);

module.exports = LeaveModel;