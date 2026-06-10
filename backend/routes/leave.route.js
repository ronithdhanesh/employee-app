const express = require("express")
const {createLeave,getLeaves,updateLeave,deleteLeave} = require("../controllers/leave.controller")

const router = express.Router()

router.get("/get", getLeaves)
router.post("/create", createLeave)
router.put("/update", updateLeave)
router.delete("/delete", deleteLeave)

module.exports = router