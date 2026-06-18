const express = require('express');
const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  approveLeave,
  rejectLeave
} = require('../controllers/leave.controller');
const authorizeRoles = require('../middleware/role.middleware');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/apply', authMiddleware, authorizeRoles('employee'), applyLeave);
router.get('/my-leaves', authMiddleware, authorizeRoles('employee',"admin"), getMyLeaves);
router.get("/all", authMiddleware, authorizeRoles("admin"), getAllLeaves)
router.patch("/:id/approve",authMiddleware,authorizeRoles("admin"),approveLeave);
router.patch("/:id/reject",authMiddleware,authorizeRoles("admin"),rejectLeave);

module.exports = router;