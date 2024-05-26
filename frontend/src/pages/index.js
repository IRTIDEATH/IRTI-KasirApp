

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Categories from "@/components/Setting";
import axios from "axios";
import React, {useEffect, useState } from 'react'
import ListMenu from "@/components/ListMenu";
import Cart from "@/components/Cart";

export default function Home() {
  const [menus, setMenus] = useState([])
  const [pilihkategori, setPilihKategori] = useState('Makanan')
  const [keranjang, setKeranjang] = useState([])
  
  useEffect(() => {
    axios
      .get("http://localhost:3004/"+"products?category.nama="+pilihkategori)
      .then((res) => {
        const menus = res.data
        setMenus(menus)
      })
      .catch((error) => {
        console.log(error);
      })

      getListCart()
  }, [])

  const changeCategory = (value) => {
    setPilihKategori(value)
    setMenus([])

    axios
      .get("http://localhost:3004/"+"products?category.nama="+value)
      .then((res) => {
        const menus = res.data
        setMenus(menus)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const getListCart = () => {
    axios
      .get("http://localhost:3004/"+"cart")
      .then((res) => {
        const keranjang = res.data
        setKeranjang(keranjang)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const addCart = (value) => {
    axios
      .get("http://localhost:3004/"+"cart?product.id="+value.id)
      .then((res) => {
        if(res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value
          }

          axios
            .post("http://localhost:3004/"+"cart", keranjang)
            .then((res) => {
              getListCart()
            })
            .catch((error) => {
              console.log(error);
            })
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah+1,
            total_harga: res.data[0].total_harga+value.harga,
            product: value
          }

          axios
            .put("http://localhost:3004/"+"cart/"+res.data[0].id, keranjang)
            .then((res) => {
              getListCart()
            })
            .catch((error) => {
              console.log(error);
            })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div>
      <div className={`flex flex-row gap-4 ${inter.className}`}>
        <Categories changeCategory={changeCategory} pilihkategori={pilihkategori}/>
        <div className="flex flex-col w-full mt-3">
          <h1 className="text-[#2E3440] font font-medium text-lg pb-1">List Menu</h1>
          <div className="w-full py-[1.2px] bg-[#D8DEE9]"/>
          <div className="grid grid-cols-3 gap-4 h-auto">
            {menus && menus.map((menu) => (
              <ListMenu
                key={menu.id}
                menu={menu}
                addCart={addCart}
              />
            ))}
          </div>
        </div>
        <Cart keranjang={keranjang} getListCart={getListCart} />
      </div>
    </div>
  );
}
