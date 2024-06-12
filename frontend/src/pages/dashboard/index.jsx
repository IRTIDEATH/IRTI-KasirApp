import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router'

import {
  DollarSign,
  Users,
  ChevronLeft
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import axios from 'axios'

const dashboard = () => {
  const [dboard, setDboard] = useState([])
  const [addcatatan, setAddcatatan] = useState([])
  const [catatan, setCatatan] = useState([])
  const date = new Date()
  const time = new Date()

  const {status} = useSession()
  const router = useRouter()

  const { data } = useSession();

  useEffect(() => {
    getDashboard()
    getDashboardcatatan()
    getCatatan()
  }, [])

  const getDashboard = () => {
    axios
      .get("http://localhost:3004/"+"dashboard")
      .then((res) => {
        const dboard = res.data
        setDboard(dboard)
      })
  }

  const DeleteDashboard = () => {
    axios
    .get("http://localhost:3004/"+"dashboard")
    .then((res) => {
      const addcatatan = res.data
      addcatatan.map((item) => {
        return axios
          .delete("http://localhost:3004/"+"dashboard/"+item.id)
          .then(() => {
            getDashboard()
          })
          .catch((error) => console.log(error))
      })
    })
  }

  const getDashboardcatatan = () => {
    axios
      .get("http://localhost:3004/"+"dashboard")
      .then((res) => {
        const addcatatan = res.data
        addcatatan.map((item) => {
          return axios
            .get("http://localhost:3004/"+"dashboard/"+item.id)
            .then((res) => {
              const addcatatans = res.data
              setAddcatatan(addcatatans)
              console.log(res.data)
            })
            .catch((error) => console.log(error))
        })
      })
  }

  const getCatatan = () => {
    axios
      .get("http://localhost:3004/"+"datecatatan")
      .then((res) => {
        const catatan = res.data
        setCatatan(catatan)
      })
  }

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

  const tambahCatatan = () => {
    axios.get("http://localhost:3004/"+"dashboard").then((res) => {
      if(res.data.length === 0) {
        return alert("Kerja dulu sana! (jangan kosong)")
      } else {
        axios
          .get("http://localhost:3004/"+"datecatatan?id=")
          .then((res) => {
            if (res.data.length === 0) {
              const addedcatatan = {
                nama_karyawan: data && data.user.fullname,
                total_pendapatans: addcatatan.total_pendapatan,
                pelanggans: addcatatan.pelanggan,
                date: date.toDateString(),
                time: time.toTimeString()
              }
              axios.post("http://localhost:3004/"+"datecatatan", addedcatatan).then((res) => {getCatatan()})
            } else {
              const addedcatatan = {
                nama_karyawan: data && data.user.fullname,
                total_pendapatans: addcatatan.total_pendapatan,
                pelanggans: addcatatan.pelanggan,
                date: date.toDateString(),
                time: time.toTimeString()
              }
              axios.post("http://localhost:3004/"+"datecatatan", addedcatatan).then((res) => {getCatatan()})
            }
        })
      }
    })
  }

  const theBtn = () => {
    tambahCatatan()
    DeleteDashboard()
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
              href={'/'}
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <ChevronLeft className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              className="text-foreground transition-colors hover:text-foreground"
            >
              Dashboard
          </Link>
        </nav>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Pendapatan
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dboard && dboard.map((dboards) => (
                <div key={dboards.id}>
                  {dboards.total_pendapatan && dboards.total_pendapatan.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR"
                  })}
                </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Pendapatan hari ini
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pelanggan
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dboard && dboard.map((dboards) => (
                <div key={dboards.id}>
                  {dboards.pelanggan}
                </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Pelanggan hari ini
              </p>
            </CardContent>
          </Card>

          <div className="flex items-center">
            <button className="px-3 py-2 bg-[#88C0D0] text-[#ECEFF4] font-medium rounded-sm"
              onClick={() => {status === 'unauthenticated' ? router.push('/auth/login') : theBtn()}}
            >
             Simpan
            </button>
          </div>
        </div>
          <div className="w-[65vw]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Nama Karyawan</TableHead>
                  <TableHead>Total Pendapatan</TableHead>
                  <TableHead>Pelanggan</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {catatan && catatan.map((item, index) => (
                  <TableRow className="" key={item.id}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{item.nama_karyawan}</TableCell>
                    <TableCell>{item.total_pendapatans && item.total_pendapatans.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR"
                    })}</TableCell>
                    <TableCell>{item.pelanggans}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
      </main>
    </div>
  )
}

export default dashboard