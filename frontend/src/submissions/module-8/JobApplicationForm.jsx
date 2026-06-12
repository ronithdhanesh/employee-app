import React from 'react';
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

function JobApplicationForm ({domain, role}) {

    const schema = yup.object().shape({
        fullName : yup.string().required("⚠️ Full Name is a required field."),
        email: yup.string().email('⚠️ Please enter a valid email address.').required('⚠️ Email address is required.'),
        experienceYear : yup.number().integer().positive('⚠️ Experience cannot be a negative number.').required('⚠️ Experience field is required.'),
        gitHub : yup.string().url('⚠️ Must be a valid URL link string.').required('⚠️ GitHub profile link is required.'),
        coverLetter : yup.string().min(20,'⚠️ Statement must be at least 20 characters long.').required('⚠️ Statement of intent is required.')

    })
  

  const {register, handleSubmit , formState : {errors}} = useForm({
    resolver: yupResolver(schema)
  })  

    function handleFormSubmit(data) {
        console.log(data);
        
    }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center font-sans text-gray-800">
      
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        
        <div className="border-b pb-4 mb-6">
          <h1 className="text-2xl font-black text-gray-900">{domain} Job Application</h1>
          <p className="text-xs text-gray-500 mt-1">Role: {role}</p>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                {...register("fullName")} 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-600 transition-colors"
              />
              {errors.fullName && (
                <p className="text-red-500 text-[11px] font-semibold mt-1">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com" 
                {...register("email")}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-600 transition-colors"
              />
              {errors.email && (
                <p className="text-red-500 text-[11px] font-semibold mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Years of Experience</label>
              <input 
                type="number" 
                placeholder="0"
                {...register("experienceYear")} 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-600 transition-colors"
              />
              {errors.experienceYear && (
                <p className="text-red-500 text-[11px] font-semibold mt-1">{errors.experienceYear.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">GitHub Profile URL</label>
              <input 
                type="url"
                {...register("gitHub")} 
                placeholder="https://github.com/... " 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-600 transition-colors"
              />
              {errors.gitHub && (
                <p className="text-red-500 text-[11px] font-semibold mt-1">{errors.gitHub.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Cover Letter / Statement of Intent</label>
            <textarea 
              rows="4"
              {...register("coverLetter")}
              placeholder="Tell us why you want to join our core architecture group..." 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-600 transition-colors resize-none"
            />
            {errors.coverLetter && (
                <p className="text-red-500 text-[11px] font-semibold mt-1">{errors.coverLetter.message}</p>
            )}
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm py-2.5 rounded-lg shadow-sm transition-colors"
            >
              Submit Application Portfolio
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default JobApplicationForm;