const express = require('express');
const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  approveLeave,
  getAllLeaves
} = require('../controllers/leave.controller');
const authorizeRoles = require('../middleware/role.middleware');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/apply', authMiddleware, authorizeRoles('employee'), applyLeave);
router.get('/my-leaves', authMiddleware, authorizeRoles('employee'), getMyLeaves);
router.get("leaves", authMiddleware, authorizeRoles("admin"), getAllLeaves)

module.exports = router;