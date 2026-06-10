require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const connectToDB = require('./config/database')

const employeeRoutes = require('./routes/employee.routes')
const authRoutes = require("./routes/auth.route")
const deptRoutes = require("./routes/department.routes")
const leaveRoutes = require("./routes/leave.route")



const port = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(express.json())



app.use("/employee", employeeRoutes)
app.use("/auth", authRoutes)
app.use("/dept", deptRoutes)
app.use("/leave", leaveRoutes)



connectToDB();

app.listen(port, ()=>{
    console.log(`app running on port 3000`);
    
})