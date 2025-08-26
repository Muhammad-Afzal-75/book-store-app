import React from 'react'
import books from '../assets/books.jpg'

function Banner() {
  return (
    <>
    <div className=' container max-w-screen-2xl mx-auto px-4 md:px-20 flex flex-col md:flex-row my-6 md:my-20 '>
        <div className='w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-20 space-y-6'>
            <h1 className='text-4xl font-bold '>Hello,welcome here to learn something <span className='text-pink-500'>new everyday!!!</span></h1>
            <p className='text-xl '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi debitis esse mollitia ab! Eaque sint ea obcaecati, voluptatibus dicta, facere velit beatae voluptatem cupiditate ipsam eum modi </p>

            <label className="input w-full  ">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                        >
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </g>
                    </svg>
                    <input type="email" placeholder="Email" required />
                    </label>
                    <button className="btn btn-secondary">Secondary</button>
                    
        </div>
       <div className="w-full md:w-1/2 order-1 md:order-2 mt-8  flex justify-center items-center">
        <img
          src={books}
          alt="Books"
          className="w-full max-w-md h-auto object-cover "
        />
      </div>
    </div>
    </>
  )
}

export default Banner
