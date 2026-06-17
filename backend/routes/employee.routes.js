const express = require('express');
const {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getTeamMembers,
  assignManager,
  getEmployeeManager,
  getMyProfile,
  updateProfile,
} = require('../controllers/employee.controller');
const authMiddleware = require('../middleware/auth.middleware');
const authorizeRoles = require('../middleware/role.middleware');
const upload = require('../upload/mutler.upload');

const router = express.Router();

router.get('/get', authMiddleware, authorizeRoles('admin', 'manager'), getEmployees);
router.post('/create', authMiddleware, authorizeRoles('admin'), upload.single('profileImage'), createEmployee);
router.put('/update/:id', authMiddleware, authorizeRoles('admin'), upload.single('profileImage'), updateEmployee);
router.delete('/delete/:id', authMiddleware, authorizeRoles('admin'), deleteEmployee);
router.get('/team', authMiddleware, authorizeRoles('manager'), getTeamMembers);
router.patch('/:id/manager', authMiddleware, authorizeRoles('admin'), assignManager);
router.get('/:id/manager', authMiddleware, authorizeRoles('admin', 'manager'), getEmployeeManager);
router.get('/profile/me', authMiddleware, authorizeRoles('employee', 'manager', 'admin'), getMyProfile);
router.patch('/profile', authMiddleware, authorizeRoles('employee', 'manager', 'admin'), upload.single('profileImage'), updateProfile);

module.exports = router;