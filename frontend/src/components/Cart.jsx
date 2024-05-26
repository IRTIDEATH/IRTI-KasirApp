

import React, { useState } from 'react'
import axios from 'axios'
import ModalCart from './ModalCart'
import PurchaseCart from './PurchaseCart'
import { faPenToSquare, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Cart = ({keranjang, getListCart, ...props}) => {
    const [cartDetail, setCartDetail] = useState(false)
    const [jumlah, setJumlah] = useState(0)
    const [totalHarga, setTotalHarga] = useState(0)
    const [showModal, setShowModal] = useState(false)

    const handleShow = (cartmenu) => {
      setShowModal(true)
      setCartDetail(cartmenu)
      setJumlah(cartmenu.jumlah)
      setTotalHarga(cartmenu.total_harga)
    }

    const handleClose = () => {
      setShowModal(false)
    }

    const btntambah = () => {
        setJumlah(jumlah+1)
        setTotalHarga(cartDetail.product.harga*(jumlah+1))
    }
    
    const btnkurang = () => {
      if(jumlah !== 1) {
        setJumlah(jumlah-1)
        setTotalHarga(cartDetail.product.harga*(jumlah-1))
      }
    }

    const updateCart = (event) => {
      event.preventDefault();
      handleClose()
      
      const data = {
        jumlah: jumlah,
        total_harga: totalHarga,
        product: cartDetail.product,
      }
    
      axios
        .put("http://localhost:3004/"+"cart/"+cartDetail.id, data)
        .then((res) => {
          getListCart()
        })
        .catch((error) => {
          console.log(error);
        })
    }

    const deleteCart = (id) => {
      handleClose()
      axios
        .delete("http://localhost:3004/"+"cart/"+id)
        .then((res) => {
          getListCart()
        })
        .catch((error) => {
          console.log(error);
        })
    }

  return (
    <div className="flex flex-col w-[30%] bg-[#ECEFF4]">
      <FontAwesomeIcon icon={faCartShopping} className="text-3xl text-[#434C5E] pt-3 pb-4"/>
      {keranjang.length !== 0 && (
        <div className='gap-3'>
            {keranjang.map((cartmenu) => (
                <div key={cartmenu.id}
                  className="flex space-x-8 border-4 border-[#D8DEE9]
                  items-center p-2 m-2 rounded-md text-[#434C5E]"
                >
                    <div className='cursor-pointer' onClick={() => handleShow(cartmenu)}>
                        <FontAwesomeIcon icon={faPenToSquare}/>
                    </div>

                    <div className="flex items-center w-full justify-between">
                      <div className="">
                          <h5>{cartmenu.product.nama}</h5>
                      </div>

                      <div className="bg-[#88C0D0] px-2 py-[0.20rem] rounded-sm">
                          <h4>{cartmenu.jumlah}</h4>
                      </div>
                    </div>
                </div>
            ))}
            <ModalCart cartDetail={cartDetail}
              totalHarga={totalHarga}
              updateCart={updateCart}
              deleteCart={deleteCart}
              btnkurang={btnkurang}
              btntambah={btntambah}
              jumlah={jumlah}
              showModal={showModal}
              handleClose={handleClose}
            />
        </div>
      )}
      <PurchaseCart keranjang={keranjang} getListCart={getListCart}/>
    </div>
  )
}

export default Cart