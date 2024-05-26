import { useSession } from 'next-auth/react'
import React from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"  
import { useRouter } from 'next/router'

const ListMenu = ({menu, addCart}) => {
    const router = useRouter()
    const {status} = useSession()
  return (
    <div className="mt-3">
        <Card>
            <CardHeader>
                <img src={"assets/images/"+menu.category.nama.toLowerCase()+"/"+menu.gambar} alt="" className="rounded-lg"/>
            </CardHeader>
            <CardContent className="space-y-3">
                <CardTitle className="text-[#2E3440]">{menu.nama}</CardTitle>
                <CardTitle className="text-[#2E3440]">{menu.harga && menu.harga.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR"
                })}</CardTitle>
            </CardContent>
            <CardFooter>
                <button className='px-3 py-2 bg-[#88C0D0] rounded-sm font-medium text-[#ECEFF4] text-xs'
                    onClick={() => {status === 'unauthenticated' ? router.push('/auth/login') : addCart(menu)}}
                >
                  ADD
                </button>
            </CardFooter>
        </Card>
    </div>
  )
}

export default ListMenu