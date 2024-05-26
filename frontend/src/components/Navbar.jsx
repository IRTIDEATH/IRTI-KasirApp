import { signIn, signOut, useSession } from "next-auth/react";
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  const { data } = useSession();
  return (
    <div className="flex items-center justify-between bg-[#434C5E] py-4">
      <div className="flex space-x-10 items-center">
        <div>
          <h1 className="bg-gradient-to-r from-[#88C0D0] from-35% to-[#5E81AC] to-100% rounded-e-sm px-3 py-2 font-medium text-[#434C5E] text-xl">Festo</h1>
        </div>

        {data ? <button onClick={() => (data ? signOut() : signIn())} className="py-2 font-medium px-3 rounded-sm bg-gradient-to-r from-[#88C0D0] from-35% to-[#5E81AC] to-100% text-[#434C5E]">Logout</button>
         : <button onClick={() => (data ? signOut() : signIn())} className="py-2 px-3 font-medium rounded-sm bg-gradient-to-r from-[#88C0D0] from-35% to-[#5E81AC] to-100% text-[#434C5E]">Login</button>
        }

        <div className="border-l-2 border-white pl-3 py-1 text-white">
          <Link href="/about">About</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar