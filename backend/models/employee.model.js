const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: [true, "An employee must be assigned to a department"],
    },

    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Professional email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },

    phone: {
      type: String,
      trim: true,
    },

    designation: {
      type: String,
      required: [true, "Job designation title is required"],
      trim: true,
    },

    hireDate: {
      type: Date,
      required: [true, "Hire date is required"],
      default: Date.now, 
    },

    status: {
      type: String,
      enum: ["Active", "On Leave", "Terminated"],
      default: "Active", 
    },
    
    profileImage: {
      type: String,
      default: null,
    },
    
  },
  {
    timestamps: true, 
  }
);


EmployeeSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

EmployeeSchema.set("toJSON", { virtuals: true });
EmployeeSchema.set("toObject", { virtuals: true });

const EmployeeModel = mongoose.model("Employees", EmployeeSchema)

module.exports = EmployeeModel