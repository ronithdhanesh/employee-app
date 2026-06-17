require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const Department = require("../models/department.model");

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    const departments = await Department.find();

    if (departments.length === 0) {
      console.log("❌ No departments found. Seed departments first.");
      process.exit(1);
    }

    const departmentsMap = {};

    departments.forEach((dept) => {
      departmentsMap[dept.name] = dept._id;
    });

    await User.deleteMany({
      role: "employee",
    });

    console.log("🗑️ Existing employee users removed");

    const password = await bcrypt.hash("password123", 10);

    const users = [
      {
        name: "John Doe",
        email: "john.doe@company.com",
        password,
        role: "employee",
        phone: "+91 9876543210",
        department: departmentsMap["Engineering"],
        position: "Software Engineer",
        joiningDate: new Date("2024-01-15"),
      },
      {
        name: "Emma White",
        email: "emma.white@company.com",
        password,
        role: "employee",
        phone: "+91 9876543211",
        department: departmentsMap["Engineering"],
        position: "Frontend Developer",
        joiningDate: new Date("2023-08-10"),
      },
      {
        name: "David Wilson",
        email: "david.wilson@company.com",
        password,
        role: "employee",
        phone: "+91 9876543212",
        department: departmentsMap["Engineering"],
        position: "Backend Developer",
        joiningDate: new Date("2023-01-20"),
      },
      {
        name: "Benjamin Clark",
        email: "benjamin.clark@company.com",
        password,
        role: "employee",
        phone: "+91 9876543213",
        department: departmentsMap["Engineering"],
        position: "Technical Lead",
        joiningDate: new Date("2021-06-11"),
      },

      {
        name: "Sophia Taylor",
        email: "sophia.taylor@company.com",
        password,
        role: "employee",
        phone: "+91 9876543214",
        department: departmentsMap["Data Science"],
        position: "Data Scientist",
        joiningDate: new Date("2023-04-12"),
      },
      {
        name: "James Thomas",
        email: "james.thomas@company.com",
        password,
        role: "employee",
        phone: "+91 9876543215",
        department: departmentsMap["Data Science"],
        position: "Data Analyst",
        joiningDate: new Date("2022-02-15"),
      },
      {
        name: "Ava Martin",
        email: "ava.martin@company.com",
        password,
        role: "employee",
        phone: "+91 9876543216",
        department: departmentsMap["Data Science"],
        position: "BI Analyst",
        joiningDate: new Date("2024-02-01"),
      },

      {
        name: "Ethan Walker",
        email: "ethan.walker@company.com",
        password,
        role: "employee",
        phone: "+91 9876543217",
        department: departmentsMap["Artificial Intelligence"],
        position: "Machine Learning Engineer",
        joiningDate: new Date("2022-08-19"),
      },
      {
        name: "Olivia Anderson",
        email: "olivia.anderson@company.com",
        password,
        role: "employee",
        phone: "+91 9876543218",
        department: departmentsMap["Artificial Intelligence"],
        position: "AI Researcher",
        joiningDate: new Date("2023-09-01"),
      },
      {
        name: "Michael Brown",
        email: "michael.brown@company.com",
        password,
        role: "employee",
        phone: "+91 9876543219",
        department: departmentsMap["Artificial Intelligence"],
        position: "Computer Vision Engineer",
        joiningDate: new Date("2024-01-10"),
      },
    ];

    await User.insertMany(users);

    console.log(`✅ Successfully seeded ${users.length} users`);
    console.log("🔑 Password for all users: password123");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding users");
    console.error(error);
    process.exit(1);
  }
}

seedUsers();