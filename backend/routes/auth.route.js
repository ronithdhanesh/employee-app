const {registerUser, loginUser, refreshAccessToken} = require("../controllers/auth.controller")
const express = require('express')

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/refresh", refreshAccessToken)

module.exports = router