import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://siempreauto.com/wp-content/uploads/sites/9/2022/05/Apps-de-autos.jpg?w=4096)] h-screen pt-8 w-full flex flex-col justify-between bg-red-400">
        <img className='w-14 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/800px-Uber_logo_2018.png" alt="" />
        <div className='bg-white py-5 pb-7 px-4'>
          <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
          <Link to='/login' className='flex justify-center items-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Home
