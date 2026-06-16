const express = require("express")
const {createLeave,getLeaves,updateLeave,deleteLeave} = require("../controllers/leave.controller")
const authorizeRoles = require("../middleware/role.middleware")
const authMiddleware = require("../middleware/auth.middleware")
const router = express.Router()

router.get("/get",authMiddleware, authorizeRoles("admin"), getLeaves)
router.post("/create", authorizeRoles("admin", "user"), createLeave)
router.patch("/update/:id", updateLeave)
router.delete("/delete/:id", deleteLeave)

module.exports = router