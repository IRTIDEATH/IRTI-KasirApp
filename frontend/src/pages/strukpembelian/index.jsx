

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { usePDF } from 'react-to-pdf'

const Sukses = () => {
  const [struk, setStruk] = useState([])
  const [totaldboards, setTotaldboard] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3004/"+"cart")
      .then((res) => {
        const keranjangs = res.data
        keranjangs.map(function(item) {
          return axios
            .delete("http://localhost:3004/"+"cart/"+item.id)
            .then((res) => console.log(res))
            .catch((error) => console.log(error))
        })
      })
      .catch((error) => {
        console.log(error);
      })

      getPesanan()
      gettotaldboard()
  }, [])

  const getPesanan = () => {
    axios
      .get("http://localhost:3004/"+"order")
      .then((res) => {
        const struk = res.data
        setStruk(struk)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const gettotaldboard = () => {
    axios
      .get("http://localhost:3004/"+"order")
      .then((res) => {
        const totaldboards = res.data
        totaldboards.map((item) => {
          return axios
            .get("http://localhost:3004/"+"order/"+item.id)
            .then((res) => {
              const totaldboardsz = res.data
              setTotaldboard(totaldboardsz)
            })
            .catch((error) => console.log(error))
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const strukbtn = () => {
    axios
      .get("http://localhost:3004/"+"order")
      .then((res) => {
        const pesanan = res.data
        pesanan.map((item) => {
          return axios
            .delete("http://localhost:3004/"+"order/"+item.id)
            .then(() => {
              getPesanan()
            })
            .catch((error) => console.log(error))
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const theBtn = () => {
    strukbtn()
    DashboardItem()
  }

  const DashboardItem = () => {
    axios
      .get("http://localhost:3004/"+"dashboard?id=")
      .then((res) => {
        if (res.data.length === 0) {
          const totaldboard = {
            total_pendapatan: totaldboards.total_bayar,
            pelanggan: 1,
          }
          axios.post("http://localhost:3004/"+"dashboard", totaldboard).then((res) => {})
        } else {
          const totaldboard = {
            total_pendapatan: res.data[0].total_pendapatan+totaldboards.total_bayar,
            pelanggan: res.data[0].pelanggan+1,
            
          }
          axios.put("http://localhost:3004/"+"dashboard/"+res.data[0].id, totaldboard).then((res) => {})
        }
      })
  }

  const { toPDF, targetRef } = usePDF({filename: 'struk.pdf'});
  return (
    <div className="flex flex-col items-center justify-center">
      <div ref={targetRef} className="flex flex-col items-center w-full justify-center mt-2">
        <div className="border-2 p-5 space-y-3">
          <div className="text-center">
            <h2>Coffee Shop Festo</h2>
            <p>Pondok Kopi</p>
            <p>Since 1945</p>
          </div>
          {struk && struk.map((struks) => (
            <div key={struks.id}>
              <div className="flex space-x-8 text-start">
                <h5> 
                  {struks.menu.map((menus) => (
                    <div key={menus.id}>{menus.product.nama}</div>
                  ))}
                </h5>
                <h5> 
                  {struks.menu.map((menus) => (
                    <div key={menus.id}>{menus.jumlah}</div>
                  ))}
                </h5>
                <h5> 
                  {struks.menu.map((menus) => (
                    <div key={menus.id}>{menus.total_harga && menus.total_harga.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR"
                    })}</div>
                  ))}
                </h5>
              </div>

              <div className="flex justify-between mt-3">
                <h5>Total : </h5>
                <h5> 
                  {struks.total_bayar && struks.total_bayar.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR"
                  })}
                </h5>
              </div>

              <div className="flex justify-between mt-3">
                <h5>Metode Pembayaran : </h5>
                <h5>
                  {struks.metode_bayar && struks.metode_bayar}
                </h5>
              </div>

              <div className="w-full bg-gray-300 py-[1px] mt-5"></div>
              <div>
                <h2 className="text-center mt-1">Terimakasih</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
        <div className="space-x-4">
          <button onClick={() => toPDF()} className="mt-9 py-2 px-3 bg-[#81A1C1] rounded-sm text-white">
            Ambil Struk
          </button>

          <Link href={'/'} onClick={theBtn} className="mt-9 py-2 px-3 bg-[#81A1C1] rounded-sm text-white">back</Link>
        </div>
    </div>
  )
}

export default Sukses