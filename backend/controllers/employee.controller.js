const EmployeeModel = require('../models/employee.model');

const getEmployees = async (req, res) => {
  try {
    const employees = await EmployeeModel.find({}).populate('departmentId reportingManagerId');
    return res.status(200).json(employees);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch employees', error: err.message });
  }
};

const createEmployee = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      profileImage: req.file ? `/uploads/${req.file.filename}` : null,
    };

    const newEmployee = await EmployeeModel.create(payload);
    return res.status(201).json(newEmployee);
  } catch (err) {
    return res.status(400).json({ message: 'Failed to create employee', error: err.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = {
      ...req.body,
    };

    if (req.file) {
      payload.profileImage = `/uploads/${req.file.filename}`;
    }

    const updated = await EmployeeModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    }).populate('departmentId reportingManagerId');

    if (!updated) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    return res.status(200).json(updated);
  } catch (err) {
    return res.status(400).json({ message: 'Failed to update employee', error: err.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedEmployee = await EmployeeModel.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    return res.status(200).json({ message: 'Employee deleted successfully', deletedEmployee });
  } catch (err) {
    return res.status(400).json({ message: 'Failed to delete employee', error: err.message });
  }
};

const getTeamMembers = async (req, res) => {
  try {
    const managerEmployeeId = req.user.employeeId;
    if (!managerEmployeeId) {
      return res.status(400).json({ message: 'Manager employeeId is missing from token' });
    }

    const team = await EmployeeModel.find({ reportingManagerId: managerEmployeeId }).populate('departmentId reportingManagerId');
    return res.status(200).json(team);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch team members', error: err.message });
  }
};

const assignManager = async (req, res) => {
  try {
    const { id } = req.params;
    const { reportingManagerId } = req.body;

    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      id,
      { reportingManagerId },
      { new: true, runValidators: true }
    ).populate('departmentId reportingManagerId');

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    return res.status(200).json(updatedEmployee);
  } catch (err) {
    return res.status(400).json({ message: 'Failed to assign manager', error: err.message });
  }
};

const getEmployeeManager = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await EmployeeModel.findById(id).populate('reportingManagerId');

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    return res.status(200).json({ reportingManager: employee.reportingManagerId });
  } catch (err) {
    return res.status(400).json({ message: 'Failed to fetch employee manager', error: err.message });
  }
};

const getMyProfile = async (req, res) => {
  try {
    const employee = await EmployeeModel.findOne({ userId: req.user.userId }).populate('departmentId reportingManagerId');

    if (!employee) {
      return res.status(404).json({ message: 'Employee profile not found' });
    }

    return res.status(200).json(employee);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const employee = await EmployeeModel.findOne({ userId: req.user.userId });
    if (!employee) {
      return res.status(404).json({ message: 'Employee profile not found' });
    }

    const allowedUpdates = {};
    if (req.body.phone) {
      allowedUpdates.phone = req.body.phone;
    }
    if (req.file) {
      allowedUpdates.profileImage = `/uploads/${req.file.filename}`;
    }

    const updated = await EmployeeModel.findByIdAndUpdate(employee._id, allowedUpdates, {
      new: true,
      runValidators: true,
    }).populate('departmentId reportingManagerId');

    return res.status(200).json(updated);
  } catch (err) {
    return res.status(400).json({ message: 'Failed to update profile', error: err.message });
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getTeamMembers,
  assignManager,
  getEmployeeManager,
  getMyProfile,
  updateProfile,
};
