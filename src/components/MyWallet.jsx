import React from 'react';
import { useState } from 'react';
import "../assets/css/my_wallet.scss";
import ModalConfirm from './ModalConfirm';
import FormWallet from "./FormWallet"
const MyWallet = () => {
    const [openModal,setOpenModal] = useState(false);
    const [openForm,setOpenForn] = useState(false)
    const [message,setMessage] = useState("")
    const [transaction,setTransaction] = useState("")
    const [data,setData] = useState({
        balance: 20000000,
        histories: [ 
            {
                transaction_type: "deposit",
                transaction_amount: "+500.000 đ",
                time: "01/01/2024"
            },
            {
                transaction_type: "withdraw",
                transaction_amount: "-500.000 đ",
                time: "01/01/2024"
            },
        ]
    })
   
    const showMessage = (data) => {
        setTransaction(data)
        if(data === "deposit"){
            
            setOpenModal(true)
            setMessage("Bạn muốn nạp tiền đúng không ?")
        }else{
            // setTransaction(data)
            setOpenModal(true)
            setMessage("Bạn muốn rút tiền đúng không ?")

        }
        
    }
    return (
        <div className='my_wallet '>
            <div className='container'>
                <h1 className='title'>My Wallet</h1>
                <p className='account_balance'>{data.balance.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                <span>Total balance</span>
                <div className='btn_deposit-withdraw'>
                    <button className='btn_deposit' onClick={() => showMessage("deposit")}>Deposit</button>
                    <button className='btn_withdraw' onClick={() => showMessage("withdraw")}>Withdraw</button>
                </div>
                <div className='history'>
                    <h1>Transaction History</h1>
                    <table>
                        <thead>
                            <tr>
                                <td>Transaction type</td>
                                <td>Transaction amount</td>
                                <td>Time</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.histories.map((history,index) => {
                                    return (
                                        <tr className={history.transaction_type} key={index}>
                                            <td>{history.transaction_type}</td>
                                            <td>{history.transaction_amount}</td>
                                            <td>{history.time}</td>
                                        </tr>
                                    )
                                })
                            }
                            
                            
                        </tbody>
                    </table>
                </div>
            </div>
            <ModalConfirm openModal={openModal} message={message} setOpenModal={setOpenModal} setOpenForn={setOpenForn}/>
            <FormWallet data={data} openForm={openForm} setOpenForn={setOpenForn} setData={setData} transaction={transaction}  />
        </div>
    )
}

export default MyWallet