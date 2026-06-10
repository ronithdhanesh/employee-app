const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Department name is required"],
      unique: true,
      trim: true,
    },
    
    code: {
      type: String,
      required: [true, "Department code is required"],
      unique: true,
      trim: true,
      uppercase: true, 
    }
  },
  {
    timestamps: true,
  }
);

const DepartmentModel = mongoose.model("Department", DepartmentSchema);
module.exports = DepartmentModel;