require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const connectToDB = require('./config/database')

const employeeRoutes = require('./routes/employee.routes')
const authRoutes = require("./routes/auth.route")



const port = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(express.json())



app.use("/employee", employeeRoutes)
app.use("/auth", authRoutes)



connectToDB();

app.listen(port, ()=>{
    console.log(`app running on port 3000`);
    
})