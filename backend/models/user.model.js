const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee"
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    },

    address: String,

    phone: {
      type: String,
      default: ""
    },

    profileImage: {
      type: String,
      default: null
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref : "Department",
      default: null
    },

    position: {
      type: String,
      default: null
    },

    reportingManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null,
      validate: {
        validator(value) {
          return value !== this._id;
        },
        message:
          "User cannot be their own reporting manager",
      },
    },

    joiningDate: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;