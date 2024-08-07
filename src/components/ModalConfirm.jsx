import React from 'react'
import "../assets/css/modal_confirm.scss"
const ModalConfirm = (props) => {
    const {openModal,message,setOpenModal,setOpenForn} = props;
    const handleCLickAgree = () => {
      setOpenModal(false);
      setOpenForn(true)
    }
  return (
    <div className={`modal_confirm ${openModal ? "open" : ""}`}>
        <div className='card'>
            <h3>Thông báo</h3>
            <h2>{message}</h2>
            <div className='btn_cancel-agree'>
                <button className='btn_cancel' onClick={() => setOpenModal(false)}>Cancel</button>
                <button className='btn_agree' onClick={() => handleCLickAgree()}>Agree</button>
            </div>
        </div>
    </div>
  )
}

export default ModalConfirm