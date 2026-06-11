const EmployeeModel = require('../models/employee.model.js')
const upload = require("../upload/mutler.upload.js")

const getEmployees = async(req, res) => {
    try {
        const employees = await EmployeeModel.find({}).populate("departmentId");
        res.json(employees)
    } catch(err){
        res.status(500).json(err)
    }
}

const createEmployee = async(req, res) =>{
    try {
        const data = req.body;
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);
        console.log(req.headers["content-type"]);
        const newEmployee = await EmployeeModel.create({
            ...req.body,
            profileImage : req.file ? `/uploads/${req.file.filename}` : null,
        })
        res.json(newEmployee)
    } catch(err){
        res.status(400).json({
            message: err.message,
            error: err
        })
    }
}

const updateEmployee = async(req, res) => {
    try{
        const id = req.params.id
        const updated = await EmployeeModel.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updated)
    } catch(err){
        res.status(400).json(err)
    }
}

const deleteEmployee = async(req, res)=>{
    try {
        const id = req.params.id;
        const deletedEmployee = await EmployeeModel.findByIdAndDelete(id)
        if(!deletedEmployee){
            return res.status(404).json({ message: "Employee not found" });
        }

        res.json({ message: "Employee deleted successfully", deletedEmployee })
    }catch(err){
        res.status(400).json(err)
    }
}



module.exports = {getEmployees, createEmployee, updateEmployee, deleteEmployee}