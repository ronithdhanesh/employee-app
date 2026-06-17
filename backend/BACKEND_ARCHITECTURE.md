# Employee Management System Backend Architecture

## Overview

This backend is a Node.js API built with Express and MongoDB using Mongoose. It provides authentication, role-based access control (RBAC), employee management, department management, leave workflows, and profile/team APIs.

It is designed as a REST-style backend for an Employee Management System supporting:

- Admin portal
- Manager portal
- Employee portal
- Leave management
- Reporting hierarchy
- JWT-based authentication with refresh token support

## Technology Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- JSON Web Tokens (`jsonwebtoken`)
- Multer for file uploads
- dotenv for environment variables
- CORS support

## Project Structure

```
backend/
  controllers/
    auth.controller.js
    department.controller.js
    employee.controller.js
    leave.controller.js
  middleware/
    auth.middleware.js
    role.middleware.js
  models/
    department.model.js
    employee.model.js
    leave.model.js
    refreshToken.model.js
    user.model.js
  routes/
    auth.route.js
    department.routes.js
    employee.routes.js
    leave.route.js
  upload/
    mutler.upload.js
  config/
    database.js
  index.js
  package.json
```

## Environment Variables

Required env vars:

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret key for access tokens
- `REFRESH_SECRET` — secret key for refresh tokens
- `PORT` — optional server port (defaults to 3000)

## Dependencies

Core dependencies:

- `express`
- `mongoose`
- `jsonwebtoken`
- `bcrypt`
- `cors`
- `dotenv`
- `multer`

Dev dependency:

- `nodemon`

## Entry Point

### `index.js`

- Loads environment variables
- Sets up Express app with JSON parsing and CORS
- Serves static files from `/uploads`
- Mounts route modules:
  - `/auth`
  - `/employee`
  - `/dept`
  - `/leave`
- Connects to MongoDB using `config/database.js`
- Starts the server

## Database Connection

### `config/database.js`

- Uses Mongoose to connect to MongoDB
- Logs `MongoDB connected successfully!` on success

## Data Models

### `models/user.model.js`

Represents authentication credentials and role assignments.

Fields:

- `name` String required
- `email` String required, unique, lowercase
- `password` String required
- `role` String required, enum: `admin`, `manager`, `employee`; default `employee`

### `models/employee.model.js`

Represents the employee business profile.

Fields:

- `userId` ObjectId reference to `users`
- `reportingManagerId` ObjectId reference to `Employees`
- `departmentId` ObjectId reference to `Department`
- `firstName`, `lastName` String required
- `email` String required, unique, validated
- `phone` String optional
- `designation` String required
- `hireDate` Date required, default now
- `status` String enum: `Active`, `On Leave`, `Terminated`, default `Active`
- `profileImage` String path to uploaded image
- timestamps for created/updated dates

### `models/department.model.js`

Represents a department.

Fields:

- `name` String required, unique
- `code` String required, unique, uppercase

### `models/leave.model.js`

Represents leave requests.

Fields:

- `employeeId` ObjectId reference to `Employees`
- `leaveType` String required, enum: `Sick`, `Annual`, `Casual`, `Maternity`, `Paternity`, `Unpaid`
- `startDate` Date required
- `endDate` Date required
- `status` String enum: `Pending`, `Approved`, `Rejected`, default `Pending`
- `reason` String optional, max 500 chars
- timestamps

### `models/refreshToken.model.js`

Stores refresh tokens persistently.

Fields:

- `userId` ObjectId reference to `users`
- `token` String required
- `expiresAt` Date required
- timestamps

## Middleware

### `middleware/auth.middleware.js`

- Extracts `Authorization` header
- Verifies bearer token using `JWT_SECRET`
- Attaches decoded token payload to `req.user`
- Returns `401` if token is missing or invalid

### `middleware/role.middleware.js`

- Accepts allowed roles: `authorizeRoles(...allowedRoles)`
- Checks `req.user.role`
- Returns `403` if the user does not have permission

## Upload Handling

### `upload/mutler.upload.js`

- Uses Multer disk storage with destination `uploads/`
- Filenames are prefixed with timestamp
- Uploaded files are publicly served by Express from `/uploads`

## Controllers

### `controllers/auth.controller.js`

Key features:

- `registerUser`:
  - creates a new user
  - hashes password with bcrypt
  - issues 15-minute access token and 7-day refresh token
  - stores refresh token in database
- `loginUser`:
  - validates email and password
  - issues new access and refresh tokens
- `refreshAccessToken`:
  - validates refresh token against stored DB record
  - returns a new 15-minute access token
- `logoutUser`:
  - revokes a refresh token by deleting it from DB

Access token payload includes:

- `userId`
- `email`
- `role`
- `employeeId` when an employee record exists for the user

### `controllers/employee.controller.js`

Supports employee data management and profile/team APIs.

Functions:

- `getEmployees` — lists all employees with department and manager populated
- `createEmployee` — creates employee records and supports profile image upload
- `updateEmployee` — updates employee data and optionally updates `profileImage`
- `deleteEmployee` — removes an employee record
- `getTeamMembers` — returns direct reports for the authenticated manager
- `assignManager` — sets `reportingManagerId` for an employee
- `getEmployeeManager` — returns the manager for a given employee
- `getMyProfile` — returns the current authenticated user's employee profile
- `updateProfile` — allows the current user to update `phone` and `profileImage`

### `controllers/department.controller.js`

Standard CRUD endpoints for departments.

Functions:

- `createDepartment`
- `getDepartments`
- `updateDepartment`
- `deleteDepartment`

### `controllers/leave.controller.js`

Supports leave application and approval workflow.

Functions:

- `createLeave` — creates a leave request from `req.user.employeeId`, status defaults to `Pending`
- `getLeaves` — admin-only view of all leaves
- `getMyLeaves` — employee-only view of their leave history
- `getTeamLeaves` — manager-only view of direct-report leave requests
- `approveLeave` — manager/admin approval, sets leave status to `Approved` and employee status to `On Leave`
- `rejectLeave` — manager/admin rejection, sets leave status to `Rejected`
- `deleteLeave` — admin-only delete

## Routes

### Authentication routes: `routes/auth.route.js`

- `POST /auth/register` — register a new user
- `POST /auth/login` — log in and receive tokens
- `POST /auth/refresh` — refresh an access token with a valid refresh token
- `POST /auth/logout` — revoke a refresh token

### Employee routes: `routes/employee.routes.js`

- `GET /employee/get` — list employees (`admin`, `manager`)
- `POST /employee/create` — create employee (`admin`)
- `PUT /employee/update/:id` — update employee (`admin`)
- `DELETE /employee/delete/:id` — delete employee (`admin`)
- `GET /employee/team` — get direct reports (`manager`)
- `PATCH /employee/:id/manager` — assign manager to employee (`admin`)
- `GET /employee/:id/manager` — get employee's manager (`admin`, `manager`)
- `GET /employee/profile/me` — get current employee profile (`employee`, `manager`, `admin`)
- `PATCH /employee/profile` — update own profile (`employee`, `manager`, `admin`)

### Department routes: `routes/department.routes.js`

- `POST /dept/create` — create department (`admin`)
- `GET /dept/get` — list departments (`admin`, `manager`, `employee`)
- `PUT /dept/update/:id` — update department (`admin`)
- `DELETE /dept/delete/:id` — delete department (`admin`)

### Leave routes: `routes/leave.route.js`

- `POST /leave/apply` — apply for leave (`employee`)
- `GET /leave/my-leaves` — current employee leave history (`employee`)
- `GET /leave/team` — manager team leave requests (`manager`)
- `PATCH /leave/:id/approve` — approve a leave (`manager`, `admin`)
- `PATCH /leave/:id/reject` — reject a leave (`manager`, `admin`)
- `GET /leave/all` — view all leave requests (`admin`)
- `DELETE /leave/delete/:id` — delete leave (`admin`)

## Authorization Rules

- `admin` has access to all management routes, department CRUD, and leave oversight
- `manager` can view their team and manage their direct reports' leave
- `employee` can view/update own profile and apply for leave

## Authentication Flow

1. Client logs in or registers
2. Server verifies credentials and returns:
   - access token valid for 15 minutes
   - refresh token valid for 7 days
3. Access token is used for protected API requests
4. When access expires, client uses `/auth/refresh` with refresh token
5. Logout removes refresh token from storage

## Token Storage

- Access tokens are stateless JWTs verified with `JWT_SECRET`
- Refresh tokens are stateful and stored in MongoDB
- Refresh token records include `expiresAt`

## File Uploads

- Employee profile images are uploaded via Multer
- Files are stored in `uploads/`
- Express serves static uploads at `/uploads`

## Error Handling

Controllers return JSON error responses with:

- `message`
- optional `error` details

There is not currently a centralized Express error handler; each controller responds directly.

## Important Notes

- The project currently supports direct-report team functionality but does not implement nested multi-level reporting hierarchy queries.
- `req.user.employeeId` is used where possible for employee-specific actions.
- The code does not yet include a scheduled task for automatic leave status synchronization.

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file with `MONGO_URI`, `JWT_SECRET`, `REFRESH_SECRET`, and optional `PORT`
3. Start the server:
   ```bash
   npm start
   ```

## Future Improvements

Possible next steps for this backend:

- Add a daily cron job to synchronize employee `status` with active approved leaves
- Add announcement and notification collections
- Add leave balance tracking
- Implement attendance and calendar APIs
- Add centralized request validation and error handling
- Add unit/integration tests

---

This document explains the current backend structure, authentication and authorization design, data models, controller responsibilities, and route-level access rules.
