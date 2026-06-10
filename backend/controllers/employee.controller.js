const EmployeeModel = require('../models/employee.model.js')

const getEmployees = async(req, res) => {
    try {
        const employees = await EmployeeModel.find({})
        res.json(employees)
    } catch(err){
        res.status(500).json(err)
    }
}

const createEmployee = async(req, res) =>{
    try {
        const data = req.body;
        const newEmployee = await EmployeeModel.create(data)
        res.json(newEmployee)
    } catch(err){
        res.status(400).json(err)
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