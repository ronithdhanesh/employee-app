const LeaveRequest = require('../models/leave.model');
const EmployeeModel = require('../models/employee.model');

const applyLeave = async (req, res) => {
  try {
    const {
      leaveType,
      startDate,
      endDate,
      reason,
    } = req.body;

    if (
      !leaveType ||
      !startDate ||
      !endDate ||
      !reason
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const leave = await LeaveRequest.create({
      employee: req.user.userId,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    return res.status(201).json({
      message: "Leave request submitted",
      leave,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to submit leave request",
    });
  }
};

const getMyLeaves = async (req, res) => {
  try {
    const leaves =
      await LeaveRequest.find({
        employee: req.user.userId,
      }).sort({
        createdAt: -1,
      });

    return res.status(200).json(
      leaves
    );
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch leaves",
    });
  }
};

const getAllLeaves = async (req, res) => {
  try {
    const leaves =
      await LeaveRequest.find()
        .populate(
          "employee",
        )
        .sort({
          createdAt: -1,
        });

    return res.status(200).json(
      leaves
    );
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch leaves",
    });
  }
};

const approveLeave = async (
  req,
  res
) => {
  try {
    const leave =
      await LeaveRequest.findById(
        req.params.id
      );

    if (!leave) {
      return res.status(404).json({
        message:
          "Leave request not found",
      });
    }

    leave.status = "Approved";

    leave.approvedBy = req.user.id;

    await leave.save();

    return res.status(200).json({
      message:
        "Leave approved successfully",
      leave,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message:
        "Failed to approve leave",
    });
  }
};

module.exports = {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  approveLeave
};