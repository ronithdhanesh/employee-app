const express = require('express');
const { registerUser, loginUser, refreshAccessToken, getUsers, getMe , getUserById , deleteUser, updateUserById} = require('../controllers/auth.controller');
const authMiddleware = require("../middleware/auth.middleware")
const authorizeRoles = require("../middleware/role.middleware")
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', refreshAccessToken);
router.get("/users",authMiddleware, authorizeRoles("admin","employee"), getUsers)
router.get("/me",authMiddleware, authorizeRoles("employee","admin"), getMe)
router.get("/users/:id", authMiddleware, authorizeRoles("admin"), getUserById )
router.patch("/users/:id", authMiddleware, authorizeRoles("admin"), updateUserById)
router.delete("/users/:id", authMiddleware, authorizeRoles("admin"), deleteUser)



module.exports = router;