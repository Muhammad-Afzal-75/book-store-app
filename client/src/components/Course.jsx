import React, { useEffect, useState } from 'react'

import Card from './Card'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Course = () => {
  const [book,setBook] =useState([])
  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5050/book');
        console.log(res.data); 
        setBook(res.data);
        
      } catch (error) {
        console.log(error);
        
      }
    }
    getBooks();
  },[])
  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 my-8 mt-20 md:mt-28 min-h-screen">
      
      {/* Heading and Text */}
      <div className="flex flex-col items-center text-center">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-semibold leading-tight">
          We're delighted to have you <span className="text-pink-500">here :)</span>
        </h1>

        <p className="mt-4 text-sm sm:text-base md:text-lg max-w-4xl">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo maiores voluptatem quo nostrum architecto nobis, dolorum natus qui porro,
           ea possimus perferendis quam magnam sapiente, nisi quis similique placeat expedita dicta! Alias vel enim, reiciendis ipsum harum aperiam assumenda amet sunt incidunt cumque optio dolorum sapiente aliquid ducimus itaque officia.
        </p>

        <Link to='/'><button className="mt-6 px-4 sm:px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition duration-300">
          Back
        </button></Link>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8 lg:gap-12 mt-10">
        {book.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </div>
  )
}

export default Course
