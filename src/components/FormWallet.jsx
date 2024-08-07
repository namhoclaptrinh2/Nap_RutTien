import React, { useState } from 'react';
import "../assets/css/form_wallet.scss";
import { useFormik } from 'formik';
import * as yup from 'yup';
const formWallet = (props) => {
  const {openForm,setOpenForn,transaction,setData,data} = props;
  
  const formWallet = useFormik({
    initialValues: {
      money: ""
    },
    validationSchema: yup.object().shape({
      money: yup.string().required("vui lòng nhập số tiền !"),
      
  }),
    onSubmit: (values) => {
      const now = new Date();

      // Định dạng theo ngôn ngữ Việt Nam
      const formattedDate = now.toLocaleString('vi-VN', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit'
      });
      if(transaction === 'deposit'){
        const cloneData = data;
        const newBalance  = cloneData.balance + values.money;
       
        const history = {
          transaction_type: transaction,
          transaction_amount: `+${values.money.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`,
          time: formattedDate
        }
        cloneData.balance = newBalance
        cloneData.histories.push(history)
        setData(cloneData);
        setOpenForn(false)
        formWallet.resetForm()
        alert("Nạp tiền thành công")
    } else{
        if(data.balance - formWallet.values.money < 0){
          formWallet.setErrors({money: "Khoảng dư trong tài khoảng không đủ"})
        }else{
          const cloneData = data;
          const newBalance  = cloneData.balance - values.money;
          const history = {
            transaction_type: transaction,
            transaction_amount: `-${values.money.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`,
            time: formattedDate
          }
          cloneData.balance = newBalance
          cloneData.histories.push(history)
          setData(cloneData);
          setOpenForn(false)
          formWallet.resetForm()
          alert("Rút tiền thành công")

        }
    }
  }
  })
  return (
    <div className={`form_wallet ${ openForm ? "open" : ""}` }>
      <div className='form'>
          <h2>{transaction}</h2>
          <form action="" onSubmit={formWallet.handleSubmit}>
          <div className='input_soTien'>
            <label htmlFor="">Số tiền </label>
            <input type="number" name='money' onChange={formWallet.handleChange} value={formWallet.values.money}/>
            {formWallet.errors.money && <p className='message'>{formWallet.errors.money}</p>}
          </div>
          <div className='btn_cancel-agree'>
                <button className='btn_cancel' onClick={() => setOpenForn(false)}>Cancel</button>
                <button type='submit' className='btn_agree' >Agree</button>
            </div>
          </form>
          
      </div>
    </div>
  )
}

export default formWallet