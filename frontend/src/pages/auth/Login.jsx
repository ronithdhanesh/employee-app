import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'

const Login = () => {
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .email('Please enter a valid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long'),
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  })

  const navigate = useNavigate()
  const { fetchUser } = useAuth()

  const [loginError, setLoginError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(data) {
    try {
      setLoginError("")
      setIsLoading(true)
      const response = await api.post(`/auth/login`, data)
      
      localStorage.setItem(
        "accessToken",
        response.data.token
      )
      
      if (response.data.refreshToken) {
        localStorage.setItem("refreshToken", response.data.refreshToken)
      }

      // Synchronize context state before routing
      await fetchUser()
      navigate("/dashboard")
    } catch (err) {
      console.log(err)
      setLoginError(err.response?.data?.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <main className="bg-gray-50 px-4 md:px-8 dark:bg-neutral-900">
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="max-w-md w-full">
            <a href="#">
              <img
                src="https://readymadeui.com/logo-alt.svg"
                alt="logo"
                className="w-14 min-h-14 mb-8 mx-auto block"
              />
            </a>

            <div className="p-6 rounded-lg bg-white border border-slate-300 shadow-xs md:p-8 dark:bg-neutral-800 dark:border-neutral-700">
              <h1 className="text-slate-900 text-center text-3xl font-bold dark:text-slate-50">
                Sign in
              </h1>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-10">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="john@readymadeui.com"
                    {...register("email")}
                    className={`px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 dark:text-slate-50 dark:bg-neutral-700 
                      ${errors.email 
                        ? 'outline-red-500 focus:outline-2 focus:-outline-offset-2 focus:outline-red-500 dark:outline-red-500' 
                        : 'outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:outline-neutral-600'
                      }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 font-medium">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    {...register("password")}
                    className={`px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 dark:text-slate-50 dark:bg-neutral-700 
                      ${errors.password 
                        ? 'outline-red-500 focus:outline-2 focus:-outline-offset-2 focus:outline-red-500 dark:outline-red-500' 
                        : 'outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:outline-neutral-600'
                      }`}
                  />
                  {errors.password && (
                    <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 font-medium">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {loginError && (
                  <div className="p-3 rounded-md bg-red-100 text-red-700 text-sm dark:bg-red-900/30 dark:text-red-200">
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </button>

                <div className="text-slate-900 text-sm text-center dark:text-slate-50">
                  Don't have an account?{' '}
                  <Link className="text-blue-700 hover:underline ml-1 font-medium dark:text-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded" to={"/register"}>
                    Sign up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Login