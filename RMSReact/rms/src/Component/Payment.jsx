import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { fetchClientMaster, selectAllClientMaster } from '../Redux/Slice/userSlice'
import '../assets/css/payment.css'

function Payment() {

  const clientId = localStorage.getItem('clientId')
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    dispatch(fetchClientMaster())
  }, [dispatch])

  const clientData = useSelector(selectAllClientMaster).filter(item => item._id === clientId)

  console.log("client ", clientData);


  const data = {
    name: '',
    amount: '',
    number: '1234567890',
    MUID: "MUID" + Date.now(),
    transcationId: 'T' + Date.now()
  }

  const handlePayment = async (e) => {
    e.preventDefault();

    setLoading(true);
    axios.post(
      'http://localhost:5000//api-gateway'
      // 'https://rsmapi.vercel.app//api-gateway'
    )
  }
  return (
    <div id="app">
      <div id="header">
        <div className="row">
          <div className="col-sm-4">
            <div id="burger-icon"><i className="fa fa-bars"></i></div>
          </div>
          <div className="col-sm-4">
            <div id="brand-name">Phone<span className="brand-alt">Pay</span></div>
          </div>
          <div className="col-sm-4">
            <div id="bell-symb">
              <i className="fa fa-bell"></i>
            </div>
          </div>
        </div>
      </div>
      <div id="slider">
       <form onSubmit={handlePayment}>
       <div className="row">
          <div className="col-sm-8">
            <div id="price-section">
              <div id="price">
                Rs. 2301
              </div>
              <div id="price-details">
                <div id="avatar">
                  <img src="https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg" alt="" />
                </div>
                <div id="price-info">Requested Payment</div>
                <div id="price-time">5 hrs ago</div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 no-pading-left">
            <div id="payment-button-section">
              <button type='submit' className="btn btn-primary">Accept</button>
              <button type='submit' className="btn btn-default">Decline</button>
            </div>
          </div>
        </div>
       </form>
      </div>
    </div>
  )
}

export default Payment