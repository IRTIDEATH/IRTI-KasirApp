import React from 'react'
import Link from 'next/link'

const addProductPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen space-y-3">
      <h1 className="text-4xl text-black font-semibold">Coming Soon</h1>
      <Link href={'/'} className="py-2 px-3 bg-black text-white rounded-sm">Back</Link>
    </div>
  )
}

export default addProductPage