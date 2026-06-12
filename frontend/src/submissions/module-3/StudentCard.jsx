import React from 'react'

const StudentCard = ({image_src, alt="no image found", student_id, name, dob, }) => {
  return (
    <div className='flex bg-white max-w-sm gap-2 rounded-lg p-1 shadow-md hover:scale-110 transition-transform'>
      <div className="image-section ">
        {image_src ? <img className='w-full h-full object-cover p-0.5 max-w-35 rounded-lg' src={image_src} alt={alt}/> : <p>no image found</p>}
        
      </div>
      <div className="student-info">
        <div>
            <h3 className='text-sm font-bold text-blue-600 pt-3'>ID : {student_id}</h3>
            <h2 className='text-2xl py-1 font-semibold'>{name}</h2>
            <p className='text-xs text-gray-500 mt-1 mb-2'>Date Of Birth : {dob}</p>
        </div>
        <div className="student-analytics my-1 text-amber-100 ">
            <button className="attenndace  bg-blue-600  py-1 px-1 rounded-md ml-0 cursor-pointer">Attendance</button>
            <button className="performance ml-1 bg-green-500 py-1 px-1 rounded-md cursor-pointer">Performance</button>
        </div>
        <button className="delete bg-red-500 py-0.5 px-3 my-1 rounded-md cursor-pointer ">Delete</button>
      </div>
    </div>
  )
}

export default StudentCard
