import React from 'react'
import {useForm} from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from 'yup'
import api from '../api/axios'

const CreateEmployee = ({onClose, refreshEmployees}) => {

  const createEmployeeSchema = yup.object().shape({
    name : yup.string().required('name is required'),
    id : yup.number('id must be a number').required('id is required').min(0,'id should be atleast 1').positive('id cant be negative'),
    role : yup.string().required('role is required'),
    department : yup.string().required('department is required')
  })
  const {register,reset, handleSubmit, formState : {errors}} = useForm({
    resolver : yupResolver(createEmployeeSchema)
  });

  async function handleFormSubmit(data) {
    await api.post('/employee/create', data)
    .then(result=>console.log(result))
    .catch(err=>console.log(err))
    console.log(data);
    await refreshEmployees()
    onClose();
  }


  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
    <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Add Employee
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create a new employee profile
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          ✕
        </button>
      </div>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-5"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter Full Name"
            {...register("name")}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 transition focus:border-slate-900 focus:bg-white focus:outline-none"
          />

          {errors.name && (
            <p className="mt-2 text-sm font-medium text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Employee ID
          </label>

          <input
            type="number"
            placeholder="001"
            {...register("id")}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 transition focus:border-slate-900 focus:bg-white focus:outline-none"
          />

          {errors.id && (
            <p className="mt-2 text-sm font-medium text-red-500">
              {errors.id.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Role
          </label>

          <input
            type="text"
            placeholder="Software Engineer"
            {...register("role")}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 transition focus:border-slate-900 focus:bg-white focus:outline-none"
          />

          {errors.role && (
            <p className="mt-2 text-sm font-medium text-red-500">
              {errors.role.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Department
          </label>

          <input
            type="text"
            placeholder="Engineering"
            {...register("department")}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 transition focus:border-slate-900 focus:bg-white focus:outline-none"
          />

          {errors.department && (
            <p className="mt-2 text-sm font-medium text-red-500">
              {errors.department.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className=" cursor-pointer rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className=" cursor-pointer rounded-xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-800"
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  </div>
)
}

export default CreateEmployee
