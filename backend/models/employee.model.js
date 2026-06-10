const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    name: String,
    id: Number,
    role: String,
    department : String
})

const EmployeeModel = mongoose.model("employees", EmployeeSchema)



module.exports = EmployeeModel