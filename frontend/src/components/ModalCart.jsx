

import React from 'react'
import { faCheck, faMinus, faPlus, faTrash, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal } from "flowbite-react";
import { comma } from '@/lib/utils';

const ModalCart = ({cartDetail, totalHarga, btnkurang, btntambah, jumlah, handleClose, showModal, updateCart, deleteCart}) => {
    if(cartDetail) {
        return (
            <Modal show={showModal} onClose={handleClose} size="sm">
                <Modal.Header>{cartDetail.product.nama}</Modal.Header>
                <Modal.Body>
                    <form onSubmit={updateCart} className="space-y-6">
                        <div>
                            <p className="text-lg font-medium">
                               {totalHarga && totalHarga.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR"
                               })}
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button size="sm" className="bg-[#81A1C1] rounded-sm text-[#434C5E]" color="transparent" onClick={() => btnkurang()} >
                                <FontAwesomeIcon icon={faMinus}/>
                            </Button>
                            {jumlah}
                            <Button size="sm" className="bg-[#81A1C1] rounded-sm text-[#434C5E]" color="transparent" onClick={() => btntambah()} >
                                <FontAwesomeIcon icon={faPlus}/>
                            </Button>
                        </div>
                        <button type='submit' className="py-2 px-4 bg-[#8FBCBB] rounded-sm mr-4 text-[#ECEFF4] font-medium"><FontAwesomeIcon icon={faCheck} /></button>
                        <button color="gray" className="py-2 px-4 bg-[#BF616A] rounded-sm text-[#ECEFF4] font-medium" onClick={() => deleteCart(cartDetail.id)}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }
}

export default ModalCart