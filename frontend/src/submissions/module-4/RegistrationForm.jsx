import React, { useState } from 'react'

const RegistrationForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    function handleSubmit(e) {
        e.preventDefault()

        console.log(`email submitted ${email}`);
        console.log(`password : ${password}`);
        
        
    }

  return (
    <div className='w-140 flex flex-col items-center justify-center bg-indigo-950 text-white p-8 rounded-lg shadow-xl m-2'>
        <h2 className="text-2xl font-bold mb-6">Sign in to your account</h2>

        <form onSubmit={handleSubmit} className='forms flex flex-col items-center'>

            <div className="email-section text-sm font-semibold text-indigo-200 mb-1">
                <h3>Enter Email</h3>
                <input type="email" value={email} onChange={(e)=>(setEmail(e.target.value))} required className="email-input bg-indigo-500 border-none rounded-md text-white p-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <div className="password-section text-sm font-semibold text-indigo-200">
                <h3>Enter Password</h3>
                <input 
                    type="password"
                    value={password}
                    onChange={(e)=>(setPassword(e.target.value))}
                    className='bg-white text-black rounded-md p-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-400'
                />
            </div>
            <button className="sign-in-button hover:cursor-pointer justify-center bg-blue-400 w-80 my-6 py-2 hover:bg-blue-500 active:bg-blue-700 transition rounded-md font-bold text-indigo-950"
                type='submit'
            >
             Sign In   
            </button>

        </form>
    </div>
  )
}

export default RegistrationForm