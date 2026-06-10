const DepartmentModel = require("../models/department.model");

async function createDepartment(req, res) {
    try {
        const dept = await DepartmentModel.create(req.body);
        return res.status(201).json(dept);
    } catch (err) {
        return res.status(400).json({ message: "Failed to create department", error: err.message });
    }
}

async function getDepartments(req, res) {
    try {
        const depts = await DepartmentModel.find({});
        return res.status(200).json(depts);
    } catch (err) {
        return res.status(400).json({ message: "Failed to fetch departments", error: err.message });
    }
}


async function updateDepartment(req, res) {
    try {
        const { id } = req.params;
        const updatedDept = await DepartmentModel.findByIdAndUpdate(
            id, 
            req.body, 
            { new: true, runValidators: true }
        );

        if (!updatedDept) {
            return res.status(404).json({ message: "Department not found" });
        }

        return res.status(200).json(updatedDept);
    } catch (err) {
        return res.status(400).json({ message: "Failed to update department", error: err.message });
    }
}


async function deleteDepartment(req, res) {
    try {
        const { id } = req.params;
        const deletedDept = await DepartmentModel.findByIdAndDelete(id);

        if (!deletedDept) {
            return res.status(404).json({ message: "Department not found" });
        }

        return res.status(200).json({ 
            message: "Department deleted successfully", 
            deletedDept 
        });
    } catch (err) {
        return res.status(400).json({ message: "Failed to delete department", error: err.message });
    }
}

module.exports = { 
    createDepartment, 
    getDepartments, 
    updateDepartment, 
    deleteDepartment 
};