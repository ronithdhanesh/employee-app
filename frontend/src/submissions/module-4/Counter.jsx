import React from 'react'
import { useState } from 'react'

const Counter = () => {
 
    const [count, setCount] = useState(0)

    function increment(){
        setCount(count + 1);
    }

    function decrement() {
        if(count<=0){
            count = 0;
        }
        setCount(count - 1);

    }
  return (
    <div className='flex items-center gap-4 bg-white px-4 py-2 rounded-xl shadow-md w-fit'>

        
        <button className='w-10 h-10 flex items-center justify-center text-2xl font-bold bg-gray-100 rounded-lg hover:bg-gray-200 transition cursor-pointer ' onClick={decrement}>-</button>

        <div className="count text-2xl">
            {count}
        </div>

        <button className='w-10 h-10 bg-gray-100 text-2xl font-bold flex items-center justify-center rounded-lg hover:bg-gray-200 cursor-pointer transition' onClick={increment}>+</button>
        
    </div>
      
  )
}

export default Counter
