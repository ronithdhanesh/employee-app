import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../api/axios";

const createEmployeeSchema = yup.object({
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

const CreateEmployee = ({ onClose, refreshEmployees }) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createEmployeeSchema),
    defaultValues: {
      status: "Active",
    },
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  async function fetchDepartments() {
    try {
      const res = await api.get("/dept/get");
      setDepartments(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  // async function handleFormSubmit(data) {
  //   try {
  //     const formData = new FormData();
  //     formData.append("firstName", data.firstName);
  //     formData.append("lastName", data.lastName);
  //     formData.append("email", data.email);
  //     formData.append("phone", data.phone || "");
  //     formData.append("designation", data.designation);
  //     formData.append("departmentId", data.departmentId);
  //     formData.append("hireDate", data.hireDate);
  //     formData.append("status", data.status);
  //     setLoading(true);

  //     await api.post("/employee/create", data);
  //     console.log(data)

  //     await refreshEmployees();
  //     onClose();
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  async function handleFormSubmit(data) {
  try {
    setLoading(true);

    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("phone", data.phone || "");
    formData.append("designation", data.designation);
    formData.append("departmentId", data.departmentId);
    formData.append("hireDate", data.hireDate);
    formData.append("status", data.status);

    if (data.profileImage?.[0]) {
      formData.append(
        "profileImage",
        data.profileImage[0]
      );
    }

    await api.post(
      "/employee/create",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
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
              Add Employee
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Create a professional employee profile
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

                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
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
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Terminated">Terminated</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Profile Image
              </label>

              <input
                type="file"
                accept="image/*"
                {...register("profileImage")}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setPreview(URL.createObjectURL(file));
                  }
                }}

                className={inputClass}
              />

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-3 h-24 w-24 rounded-full object-cover border"
                />
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
              {loading ? "Creating..." : "Create Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;