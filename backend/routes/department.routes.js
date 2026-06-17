const express = require('express');
const { createDepartment, getDepartments, updateDepartment, deleteDepartment } = require('../controllers/department.controller');
const authMiddleware = require('../middleware/auth.middleware');
const authorizeRoles = require('../middleware/role.middleware');

const router = express.Router();

router.post('/create', authMiddleware, authorizeRoles('admin'), createDepartment);
router.get('/get', getDepartments);
router.put('/update/:id', authMiddleware, authorizeRoles('admin'), updateDepartment);
router.delete('/delete/:id', authMiddleware, authorizeRoles('admin'), deleteDepartment);
module.exports = router;