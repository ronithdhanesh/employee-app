import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../api/axios";

const updateDepartmentSchema = yup.object({
  name : yup.string().required("Department name is required"),

  code: yup.string().required("Code is required"),
});

const UpdateDepartment = ({ department, onClose, refreshDepartments }) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateDepartmentSchema),
    defaultValues: {
      status: "Active",
    },
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(()=>{
    if(department){
        reset({
            name : department.name || "",
            code : department.code || ""
        })
    }
  },[department, reset])

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
      await api.put(`/dept/update/${department._id}`, data);
      console.log(data)

      await refreshDepartments();
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
      <div className="w-full max-w-4xl rounded-3xl bg-white p-8 shadow-2xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Add Department
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Create a new department profile
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer h-10 w-10 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900"
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
                Department Name
              </label>

              <input
                {...register("name")}
                placeholder="Engineering"
                className={inputClass}
              />

              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Department Code
              </label>

              <input
                {...register("code")}
                placeholder="ENG"
                className={inputClass}
              />

              {errors.code  && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.code.message}
                </p>
              )}
            </div>


          </div>

          <div className="flex justify-end gap-3 border-t pt-6">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer rounded-xl bg-slate-900 px-6 py-3 font-medium text-white hover:bg-slate-800 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Edit Department"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDepartment;