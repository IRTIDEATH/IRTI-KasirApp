import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const PurchaseCart = ({keranjang}) => {

    useEffect(() => {
      axios.get("http://localhost:3004/"+"paymethod").then((res) => {
        const paym = res.data
        setPaym(paym)
        console.log(paym);
      })
    }, [])

    const [paym, setPaym] = useState()
    const [payms, setPayms] = useState()

    const router = useRouter()
    const {status} = useSession()

    const totalBayar = keranjang.reduce(function (result, item) {
        return result + item.total_harga
    }, 0)

    const TotalBayar = (totalBayar, payms) => {
      axios.get("http://localhost:3004/"+"cart").then((res) => {
        if(res.data.length === 0) {
          return alert("do not empty the cart")
        } else {
          const pesanan = {
            total_bayar: totalBayar,
            metode_bayar: payms,
            menu: keranjang
          }
          axios.post("http://localhost:3004/"+"order", pesanan).then((res) => {})
          router.push('/strukpembelian')
        }
      })
    }

  return (
    <div className="fixed w-[18%] bottom-0">
        <div className="py-4 px-3 my-3 ml-3 mr-2 bg-[#81A1C1] flex flex-col rounded-md text-[#ECEFF4]">
            <div className="mb-6 text-[#5E81AC]">
              <select className="outline-none bg-[#ECEFF4] focus:ring-transparent focus:border-transparent"
                value={payms}
                onChange={(e) => setPayms((e.target.value))}
              >
                <option value="" selected disabled>Payment Method</option>
                {paym && paym.map((paymse) => (
                  <option value={paymse.title} key={paymse.id}>{paymse.title}</option>
                ))}
              </select>
            </div>
            <h4 className="pb-3 font-medium text">Total : {totalBayar && totalBayar.toLocaleString("id-id", {
              style: "currency",
              currency: "IDR"
            })}</h4>
            <button className="font-medium bg-[#88C0D0] text-center py-2 rounded-sm"
              onClick={() => {status === 'unauthenticated' ? router.push('/auth/login') : TotalBayar(totalBayar, payms)}}
            >
              Purchase Here
            </button>
        </div>
    </div>
  )
}

export default PurchaseCart