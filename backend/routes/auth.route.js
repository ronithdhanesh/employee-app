const express = require('express');
const { registerUser, loginUser, refreshAccessToken, getUsers, getMe} = require('../controllers/auth.controller');
const authMiddleware = require("../middleware/auth.middleware")
const authorizeRoles = require("../middleware/role.middleware")
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', refreshAccessToken);
router.get("/users", getUsers)
router.get("/me",authMiddleware, authorizeRoles("employee"), getMe)
// router.post('/logout', logoutUser);

module.exports = router;