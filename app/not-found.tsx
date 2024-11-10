import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-4xl font-bold'>Not Found</h1>
        <p className='text-lg'>The page you are looking for does not exist.</p>
        <Link href="/" className='bg-fd-accent p-2 rounded-md mt-4'>Go Back to Home</Link>
    </div>
  )
}

export default NotFound