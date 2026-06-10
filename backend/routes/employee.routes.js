const express = require('express')
const {getEmployees, createEmployee, updateEmployee, deleteEmployee} = require('../controllers/employee.controller')
const authMiddleware = require("../middleware/auth.middleware")
const router = express.Router()

router.get("/get", getEmployees )
router.post("/create", createEmployee)
router.put("/update/:id",authMiddleware, updateEmployee)
router.delete("/delete/:id",authMiddleware, deleteEmployee)

module.exports = router