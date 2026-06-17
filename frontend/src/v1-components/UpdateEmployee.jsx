import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../api/axios";

const updateEmployeeSchema = yup.object({
  firstName: yup.string().required("First name is required"),

  lastName: yup.string().required("Last name is required"),

  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),

  phone: yup.string(),

  designation: yup.string().required("Designation is required"),

  departmentId: yup.string().required("Department is required"),

  hireDate: yup.string().required("Hire date is required"),

  status: yup.string().required("Status is required"),
});

const UpdateEmployee = ({
  employee,
  onClose,
  refreshEmployees,
}) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateEmployeeSchema),
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (employee) {
      reset({
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
        phone: employee.phone || "",
        designation: employee.designation || "",

        departmentId:
          employee.departmentId?._id ||
          employee.departmentId ||
          "",

        hireDate: employee.hireDate
          ? new Date(employee.hireDate)
              .toISOString()
              .split("T")[0]
          : "",

        status: employee.status || "Active",
      });
    }
  }, [employee, reset]);

  async function fetchDepartments() {
    try {
      const res = await api.get("/dept/get");
      setDepartments(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleFormSubmit(data) {
    try {
      setLoading(true);

      await api.put(
        `/employee/update/${employee._id}`,
        data
      );

      await refreshEmployees();
      onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 transition focus:border-slate-900 focus:bg-white focus:outline-none";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Update Employee
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Edit employee information and employment details
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="h-10 w-10 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                First Name
              </label>

              <input
                {...register("firstName")}
                placeholder="John"
                className={inputClass}
              />

              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Last Name
              </label>

              <input
                {...register("lastName")}
                placeholder="Doe"
                className={inputClass}
              />

              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email Address
              </label>

              <input
                type="email"
                {...register("email")}
                placeholder="john@company.com"
                className={inputClass}
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone Number
              </label>

              <input
                {...register("phone")}
                placeholder="+91 9876543210"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Designation
              </label>

              <input
                {...register("designation")}
                placeholder="Software Engineer"
                className={inputClass}
              />

              {errors.designation && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.designation.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Department

              </label>

              <select
                {...register("departmentId")}
                className={inputClass}
              >
                <option value="">
                  Select Department
                </option>

                {departments.map((dept) => (
                  <option
                    key={dept._id}
                    value={dept._id}
                  >
                    {dept.name}
                  </option>
                ))}
              </select>

              {errors.departmentId && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.departmentId.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Hire Date
              </label>

              <input
                type="date"
                {...register("hireDate")}
                className={inputClass}
              />

              {errors.hireDate && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.hireDate.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Employment Status
              </label>

              <select
                {...register("status")}
                className={inputClass}
              >
                <option value="Active">
                  Active
                </option>
                <option value="On Leave">
                  On Leave
                </option>
                <option value="Terminated">
                  Terminated
                </option>
              </select>

              {errors.status && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t pt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-slate-900 px-6 py-3 font-medium text-white hover:bg-slate-800 disabled:opacity-50"
            >
              {loading
                ? "Updating..."
                : "Update Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployee;