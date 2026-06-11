const LeaveModel = require("../models/leave.model");
const EmployeeModel = require("../models/employee.model")

async function createLeave(req, res) {
    try {
        const leave = await LeaveModel.create(req.body);

        return res.status(201).json(leave);
    } catch (err) {
        return res.status(400).json({
            message: "Failed to create leave request",
            error: err.message
        });
    }
}

async function getLeaves(req, res) {
    try {
        const leaves = await LeaveModel.find({})
            .populate({
                path: "employeeId",
                populate: {
                    path: "departmentId"
                }
            });
        return res.status(200).json(leaves);
    } catch (err) {
        return res.status(400).json({
            message: "Failed to fetch leave requests",
            error: err.message
        });
    }
}

async function updateLeave(req, res) {
    try {
        const { id } = req.params;

        const updatedLeave = await LeaveModel.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        ).populate({
            path: "employeeId",
            populate: {
                path: "departmentId",
            },
        });

        if (!updatedLeave) {
            return res.status(404).json({
                message: "Leave request not found",
            });
        }

        if (updatedLeave.status === "Approved"){
            await EmployeeModel.findByIdAndUpdate(
                updatedLeave.employeeId,
                {
                    status: "On Leave"
                }
            );
        }

        return res.status(200).json(updatedLeave);
    } catch (err) {
        return res.status(400).json({
            message: "Failed to update leave request",
            error: err.message,
        });
    }
}


async function deleteLeave(req, res) {
    try {
        const { id } = req.params;

        const deletedLeave = await LeaveModel.findByIdAndDelete(id);

        if (!deletedLeave) {
            return res.status(404).json({
                message: "Leave request not found"
            });
        }

        return res.status(200).json({
            message: "Leave request deleted successfully",
            deletedLeave
        });
    } catch (err) {
        return res.status(400).json({
            message: "Failed to delete leave request",
            error: err.message
        });
    }
}

module.exports = {
    createLeave,
    getLeaves,
    updateLeave,
    deleteLeave
};