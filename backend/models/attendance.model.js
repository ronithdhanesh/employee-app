const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employees",
      required: [true, "Attendance log must belong to an employee"],
    },

    date: {
      type: Date,
      required: [true, "Attendance date is required"],
      default: () => new Date().setHours(0, 0, 0, 0), 
    },

    status: {
      type: String,
      required: [true, "Attendance status is required"],
      enum: ["Present", "Absent", "Late", "Half-Day"],
      default: "Present",
    },

    checkIn: {
      type: String, 
      trim: true,
    },

    checkOut: {
      type: String, 
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

AttendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

const AttendanceModel = mongoose.model("Attendance", AttendanceSchema);

module.exports = AttendanceModel;