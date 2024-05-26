import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import axios from 'axios'
import { metodebayar } from '@/constant'
import { useRouter } from 'next/router'

const PurchaseCart = ({keranjang, getListCart}) => {
    const router = useRouter()
    const {status} = useSession()

    const totalBayar = keranjang.reduce(function (result, item) {
        return result + item.total_harga
    }, 0)

    const TotalBayar = (totalBayar) => {
      axios.get("http://localhost:3004/"+"cart").then((res) => {
        if(res.data.length === 0) {
          return alert("do not empty the cart")
        } else {
          const pesanan = {
            total_bayar: totalBayar,
            menu: keranjang
          }
          axios.post("http://localhost:3004/"+"order", pesanan).then((res) => {})
          router.push('/strukpembelian')
        }
      })
    }

    const [clicked, setClicked] = useState(null)

    const activebtn = (e) => {
      setClicked(e.target.innerText)
    }
  return (
    <div className="fixed w-[18%] bottom-0">
        <div className="py-4 px-3 my-3 ml-3 mr-2 bg-[#81A1C1] flex flex-col rounded-md text-[#ECEFF4]">
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-3 self-center justify-items-center">
                {metodebayar && metodebayar.map((metodebayars) => (
                  <button onClick={activebtn} key={metodebayars.id} className={clicked === `${metodebayars.title}` ? "bg-[#88C0D0] p-2 w-full rounded-sm" : "border-2 border-[#88C0D0] w-full p-2 rounded-sm"}>
                    {metodebayars.title}
                  </button>
                ))}
              </div>
            </div>
            <h4 className="pb-3 font-medium text">Total : {totalBayar && totalBayar.toLocaleString("id-id", {
              style: "currency",
              currency: "IDR"
            })}</h4>
            <button className="font-medium bg-[#88C0D0] text-center py-2 rounded-sm"
              onClick={() => {status === 'unauthenticated' ? router.push('/auth/login') : TotalBayar(totalBayar)}}
            >
              Purchase Here
            </button>
        </div>
    </div>
  )
}

export default PurchaseCart