import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import api from '../../api/axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const navigate = useNavigate()
    const [registerError, setRegisterError] = useState("")

  const registerSchema = yup.object().shape({
    name : yup
        .string()
        .required("Name is required"),
    email: yup
      .string()
      .required('Email is required')
      .email('Please enter a valid email address'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: yup
      .string()
      .required('Please confirm your password')
      .oneOf([yup.ref('password'), null], 'Passwords do not match'),
    tmc: yup
      .boolean()
      .oneOf([true], 'You must accept the terms and conditions'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
  })

  const onSubmit = async(data) => {
    // console.log('Registration Data Successfully Validated:', data)
    try {
      setRegisterError("")
      const {name, email, password} = data

      const newData = {
          name : name,
          email : email,
          password : password
      }

      const response = await api.post("/auth/register", newData)
      localStorage.setItem(
        "accessToken",
        response.data.accessToken
      );

      localStorage.setItem(
        "refreshToken",
        response.data.refreshToken
      );

      navigate("/dashboard")
      

      console.log(newData);
    } catch(err){
      setRegisterError(err.response?.data?.message || "Something went wrong. Please try again.")
      console.log(err);
    }
    
    
  }

  return (
    <div>
      <main className="max-w-4xl flex items-center mx-auto md:min-h-screen p-4 md:p-8">
        <div className="grid items-center gap-y-10 bg-white border border-slate-100 [box-shadow:0_2px_10px_-3px_rgba(14,14,14,0.3)] rounded-lg overflow-hidden md:grid-cols-3 dark:bg-neutral-800 dark:border-neutral-700">
          
         
          <div className="flex flex-col justify-center space-y-6 min-h-full bg-gradient-to-r from-slate-900 to-slate-700 p-6 max-md:order-1 md:space-y-16">
            <div>
              <h2 className="text-white text-lg font-medium dark:text-slate-50">Create Your Account</h2>
              <p className="text-sm text-slate-400 mt-4 leading-relaxed">Welcome to our registration page! Get started by creating your account.</p>
            </div>
            <div>
              <h2 className="text-white text-lg font-medium dark:text-slate-50">Simple & Secure Registration</h2>
              <p className="text-sm text-slate-400 mt-4 leading-relaxed">Our registration process is designed to be straightforward and secure. We prioritize your privacy and data security.</p>
            </div>
          </div>

        
          <div className="w-full py-6 px-6 max-w-lg mx-auto md:col-span-2 md:px-14">
            <div className="mb-10">
              <h1 className="text-slate-900 text-2xl font-bold dark:text-slate-50">Create an account</h1>
            </div>

           
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div>
                <label htmlFor="email" className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">
                  Full Name
                </label>
                <input 
                  type="name" 
                  id="name" 
                  placeholder="john@readymadeui.com"
                  {...register('name')}
                  className={`px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 dark:text-slate-50 dark:bg-neutral-700 
                    ${errors.name 
                      ? 'outline-red-500 focus:outline-2 focus:-outline-offset-2 focus:outline-red-500 dark:outline-red-500' 
                      : 'outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:outline-neutral-600'
                    }`} 
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">{errors.name.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">
                  Email
                </label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="john@readymadeui.com"
                  {...register('email')}
                  className={`px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 dark:text-slate-50 dark:bg-neutral-700 
                    ${errors.email 
                      ? 'outline-red-500 focus:outline-2 focus:-outline-offset-2 focus:outline-red-500 dark:outline-red-500' 
                      : 'outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:outline-neutral-600'
                    }`} 
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">{errors.email.message}</p>
                )}
              </div>

           
              <div>
                <label htmlFor="password" className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">
                  Password
                </label>
                <input 
                  type="password" 
                  id="password" 
                  placeholder="••••••••"
                  {...register('password')}
                  className={`px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 dark:text-slate-50 dark:bg-neutral-700 
                    ${errors.password 
                      ? 'outline-red-500 focus:outline-2 focus:-outline-offset-2 focus:outline-red-500 dark:outline-red-500' 
                      : 'outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:outline-neutral-600'
                    }`} 
                />
                {errors.password && (
                  <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">{errors.password.message}</p>
                )}
              </div>

              
              <div>
                <label htmlFor="confirmPassword" className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">
                  Confirm password
                </label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  placeholder="••••••••"
                  {...register('confirmPassword')}
                  className={`px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 dark:text-slate-50 dark:bg-neutral-700 
                    ${errors.confirmPassword 
                      ? 'outline-red-500 focus:outline-2 focus:-outline-offset-2 focus:outline-red-500 dark:outline-red-500' 
                      : 'outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:outline-neutral-600'
                    }`} 
                />
                {errors.confirmPassword && (
                  <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">{errors.confirmPassword.message}</p>
                )}
              </div>

             
              <div>
                <div className="flex items-start flex-wrap gap-2">
                  <label className="flex items-center group has-[input:checked]:text-slate-900">
                    <input 
                      id="tmc" 
                      type="checkbox" 
                      {...register('tmc')}
                      className="sr-only" 
                    />
                    <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded outline-1 bg-white dark:bg-neutral-700 group-has-[input:checked]:bg-blue-600 group-has-[input:checked]:outline-blue-600 group-focus-within:outline-2 group-focus-within:outline-blue-600
                      ${errors.tmc ? 'outline-red-500 dark:outline-red-500' : 'outline-slate-300 dark:outline-neutral-600'}`}
                      aria-hidden="true"
                    >
                      <svg className="size-3 text-white opacity-0 group-has-[input:checked]:opacity-100" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 5l3 3 7-7" />
                      </svg>
                    </span>
                    <span className="ml-3 text-sm text-slate-700 dark:text-slate-300">
                      I accept the
                    </span>
                  </label>

                  <a href="#" className="ml-1 text-sm font-medium text-blue-700 dark:text-blue-500 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                    Terms and Conditions
                  </a>
                </div>
                {errors.tmc && (
                  <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">{errors.tmc.message}</p>
                )}
              </div>

              {registerError && (
                        <div className="p-3 rounded-md bg-red-100 text-red-700 text-sm">
                            {registerError}
                        </div>
                    )}

              <button type="submit" className="w-full py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                Create an account
              </button>
            </form>

            <div className="mt-6 text-slate-900 text-sm text-center dark:text-slate-50">
              Already have an account?{' '}
              <Link className='text-blue-700 hover:underline ml-1 font-medium dark:text-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded' to={"/login"}>
                Login here
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default Register