const express = require("express")
const {createLeave,getLeaves,updateLeave,deleteLeave} = require("../controllers/leave.controller")

const router = express.Router()

router.get("/get", getLeaves)
router.post("/create", createLeave)
router.patch("/update/:id", updateLeave)
router.delete("/delete/:id", deleteLeave)

module.exports = router