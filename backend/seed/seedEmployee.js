require("dotenv").config();
const mongoose = require("mongoose");

const Employee = require("../models/employee.model");
const Department = require("../models/department.model");

async function seedEmployees() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    const departments = await Department.find();

    if (departments.length === 0) {
      console.log(
        "❌ No departments found. Please create departments first."
      );
      process.exit(1);
    }

    const departmentsMap = {};

    departments.forEach((dept) => {
      departmentsMap[dept.name] = dept._id;
    });

    await Employee.deleteMany({});
    console.log("🗑️ Existing employees removed");

    const employees = [
      // Engineering
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@company.com",
        phone: "+91 9876543210",
        designation: "Software Engineer",
        departmentId: departmentsMap["Engineering"],
        hireDate: new Date("2024-01-15"),
        status: "Active",
      },
      {
        firstName: "Emma",
        lastName: "White",
        email: "emma.white@company.com",
        phone: "+91 9876543211",
        designation: "Frontend Developer",
        departmentId: departmentsMap["Engineering"],
        hireDate: new Date("2023-08-10"),
        status: "Active",
      },
      {
        firstName: "David",
        lastName: "Wilson",
        email: "david.wilson@company.com",
        phone: "+91 9876543212",
        designation: "Backend Developer",
        departmentId: departmentsMap["Engineering"],
        hireDate: new Date("2023-01-20"),
        status: "On Leave",
      },
      {
        firstName: "Benjamin",
        lastName: "Clark",
        email: "benjamin.clark@company.com",
        phone: "+91 9876543213",
        designation: "Technical Lead",
        departmentId: departmentsMap["Engineering"],
        hireDate: new Date("2021-06-11"),
        status: "Active",
      },

      // Data Science
      {
        firstName: "Sophia",
        lastName: "Taylor",
        email: "sophia.taylor@company.com",
        phone: "+91 9876543214",
        designation: "Data Scientist",
        departmentId: departmentsMap["Data Science"],
        hireDate: new Date("2023-04-12"),
        status: "Active",
      },
      {
        firstName: "James",
        lastName: "Thomas",
        email: "james.thomas@company.com",
        phone: "+91 9876543215",
        designation: "Data Analyst",
        departmentId: departmentsMap["Data Science"],
        hireDate: new Date("2022-02-15"),
        status: "Active",
      },
      {
        firstName: "Ava",
        lastName: "Martin",
        email: "ava.martin@company.com",
        phone: "+91 9876543216",
        designation: "BI Analyst",
        departmentId: departmentsMap["Data Science"],
        hireDate: new Date("2024-02-01"),
        status: "On Leave",
      },

      // Artificial Intelligence
      {
        firstName: "Ethan",
        lastName: "Walker",
        email: "ethan.walker@company.com",
        phone: "+91 9876543217",
        designation: "Machine Learning Engineer",
        departmentId: departmentsMap["Artificial Intelligence"],
        hireDate: new Date("2022-08-19"),
        status: "Active",
      },
      {
        firstName: "Olivia",
        lastName: "Anderson",
        email: "olivia.anderson@company.com",
        phone: "+91 9876543218",
        designation: "AI Researcher",
        departmentId: departmentsMap["Artificial Intelligence"],
        hireDate: new Date("2023-09-01"),
        status: "Active",
      },
      {
        firstName: "Michael",
        lastName: "Brown",
        email: "michael.brown@company.com",
        phone: "+91 9876543219",
        designation: "Computer Vision Engineer",
        departmentId: departmentsMap["Artificial Intelligence"],
        hireDate: new Date("2024-01-10"),
        status: "Active",
      },

      // Human Resource
      {
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah.johnson@company.com",
        phone: "+91 9876543220",
        designation: "HR Executive",
        departmentId: departmentsMap["Human Resource"],
        hireDate: new Date("2022-07-12"),
        status: "Active",
      },
      {
        firstName: "Mia",
        lastName: "Lewis",
        email: "mia.lewis@company.com",
        phone: "+91 9876543221",
        designation: "Recruiter",
        departmentId: departmentsMap["Human Resource"],
        hireDate: new Date("2023-03-18"),
        status: "Active",
      },

      // Management
      {
        firstName: "Emily",
        lastName: "Davis",
        email: "emily.davis@company.com",
        phone: "+91 9876543222",
        designation: "Project Manager",
        departmentId: departmentsMap["Management"],
        hireDate: new Date("2021-05-10"),
        status: "Active",
      },
      {
        firstName: "Daniel",
        lastName: "Martinez",
        email: "daniel.martinez@company.com",
        phone: "+91 9876543223",
        designation: "Operations Manager",
        departmentId: departmentsMap["Management"],
        hireDate: new Date("2020-11-02"),
        status: "Active",
      },
      {
        firstName: "William",
        lastName: "Harris",
        email: "william.harris@company.com",
        phone: "+91 9876543224",
        designation: "Director",
        departmentId: departmentsMap["Management"],
        hireDate: new Date("2019-08-21"),
        status: "Terminated",
      },
    ];

    await Employee.insertMany(employees);

    console.log(
      `✅ Successfully seeded ${employees.length} employees`
    );

    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding employees:");
    console.error(err);
    process.exit(1);
  }
}

seedEmployees();