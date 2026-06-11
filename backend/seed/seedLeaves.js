require("dotenv").config();
const mongoose = require("mongoose");

const Employee = require("../models/employee.model");
const Leave = require("../models/leave.model");

async function seedLeaves() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    const employees = await Employee.find();

    if (employees.length === 0) {
      console.log(
        "❌ No employees found. Seed employees first."
      );
      process.exit(1);
    }

    await Leave.deleteMany({});
    console.log("🗑️ Existing leave requests removed");

    const leaveTypes = [
      "Sick",
      "Annual",
      "Casual",
      "Maternity",
      "Paternity",
      "Unpaid",
    ];

    const statuses = [
      "Pending",
      "Approved",
      "Rejected",
    ];

    const reasons = [
      "Medical consultation and recovery.",
      "Family function attendance.",
      "Vacation with family.",
      "Personal work requiring leave.",
      "Child care responsibilities.",
      "Emergency travel requirements.",
      "Mental health and wellness break.",
      "Marriage ceremony attendance.",
      "Academic examination preparation.",
      "House relocation process.",
    ];

    const leaves = [];

    // Create 2 leave requests per employee
    employees.forEach((employee) => {
      for (let i = 0; i < 2; i++) {
        const startDate = new Date();

        // Random future/past date within 90 days
        startDate.setDate(
          startDate.getDate() +
            Math.floor(Math.random() * 90) -
            45
        );

        const duration =
          Math.floor(Math.random() * 5) + 1;

        const endDate = new Date(startDate);
        endDate.setDate(
          startDate.getDate() + duration
        );

        const leave = {
          employeeId: employee._id,

          leaveType:
            leaveTypes[
              Math.floor(
                Math.random() *
                  leaveTypes.length
              )
            ],

          status:
            statuses[
              Math.floor(
                Math.random() *
                  statuses.length
              )
            ],

          reason:
            reasons[
              Math.floor(
                Math.random() *
                  reasons.length
              )
            ],

          startDate,
          endDate,
        };

        leaves.push(leave);
      }
    });

    await Leave.insertMany(leaves);

    console.log(
      `✅ Successfully seeded ${leaves.length} leave requests`
    );

    process.exit(0);
  } catch (err) {
    console.error(
      "❌ Error seeding leave requests:"
    );
    console.error(err);
    process.exit(1);
  }
}

seedLeaves();