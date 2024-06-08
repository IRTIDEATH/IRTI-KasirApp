import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUtensils, faCoffee} from '@fortawesome/free-solid-svg-icons'
import { PackagePlus } from 'lucide-react';
import Link from 'next/link'


const Categories = ({changeCategory, pilihkategori}) => {
    const { data, status } = useSession();

    const Icon = ({nama}) => {
        if(nama === "Makanan") return <FontAwesomeIcon icon={faUtensils}/>
        if(nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} className='ikonkopi'/>
      
        return <FontAwesomeIcon icon={faUtensils}/>
    }

    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios
          .get("http://localhost:3004/"+"categories")   
          .then((res) => {
              const categories = res.data
              setCategories(categories)
          })
          .catch((error) => {
              console.log(error);
          })
    }, [])

  return (
    <div className='flex flex-col w-[30%] bg-[#4C566A]'>
        <div className="p-5 text-center flex items-center">
            <img src={"avatar.png"} alt="" className="h-auto w-[30%] mr-3"/>
            <div className="flex flex-col w-full space-y-2">
                {
                    status === 'unauthenticated' ? <div className="w-[50%] rounded-full h-2 bg-[#D8DEE9]"></div>
                    : <div className="w-[50%] text-white">{data && data.user.fullname}</div>
                }
                {
                    status === 'unauthenticated' ? <div className="w-[80%] rounded-full h-2 bg-[#D8DEE9]"></div>
                    : <div className="w-[50%] text-white text-xs">{data && data.user.email}</div>
                }
            </div>
        </div>
        <div className="bg-[#D8DEE9] flex flex-col space-y-5 items-center mr-6 p-5 rounded-e-md">
            <h4 className="text-[#2E3440] font-medium text-xl">Snack & Drink</h4>
            <div>
                <div className='flex space-x-7'>
                    {categories && categories.map((category) => (
                        <button key={category.id} onClick={() => changeCategory(category.nama)}
                            className={pilihkategori === category.nama ?
                            "text-[#2E3440] text-sm bg-[#88C0D0] p-2 rounded-sm" :
                            "text-[#2E3440] text-sm p-2"}
                        >
                            <Icon nama={category.nama}/>
                        </button>
                    ))}
                </div>
            </div>
        </div>

        <Link href={'/dashboard'} className="mt-12 font-medium text-xl text-[#D8DEE9] flex space-x-2 items-center justify-center p-3 mx-9 rounded-sm bg-transparent hover:bg-[#81A1C1] transition duration-300 ease-in-out">
            <img src={"dashbicon.svg"} alt="" className="object-contain w-[18%] h-auto"/>
            <h1 className="text-center">Dashboard</h1>
        </Link>

        <Link href={'/addproduct'} className="mt-4 font-medium text-xl text-[#D8DEE9] flex space-x-2 items-center justify-center p-3 mx-9 rounded-sm bg-transparent hover:bg-[#81A1C1] transition duration-300 ease-in-out">
            <PackagePlus size={'30px'}/>
            <h1 className="text-center">AddProduct</h1>
        </Link>

        <div className='mt-[875px]'></div>
        <img src={"barbottom.png"} alt="" />
    </div>
  )
}

export default Categories