require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const connectToDB = require('./config/database')

const employeeRoutes = require('./routes/employee.routes')
const authRoutes = require("./routes/auth.route")





const app = express()
app.use(cors())
app.use(express.json())



app.use("/employee", employeeRoutes)
app.use("/auth", authRoutes)



connectToDB();

app.listen(3000, ()=>{
    console.log(`app running on port 3000`);
    
})