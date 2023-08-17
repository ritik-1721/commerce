import React, { useCallback, useState } from 'react';
import axios from 'axios';
import useRazorpay from 'react-razorpay';


function createVerify(data) {
    return axios.post(`http://localhost:5000/api/verify`, data);
}

function getPaymentDetails(data) {
    return axios.post(`http://localhost:5000/api/payDetails`, data);
}

const Payment = () => {
    const Razorpay = useRazorpay();

    const [payment, setPayment] = useState(false);


    const handleRazorPayment = useCallback(
        result => {
            const options = {
                key: 'rzp_test_QwRkxxPsNKaaaQ',
                amount: result.data.data.amount,
                currency: result.data.data.currency,
                order_id: result.data.data.id,
                name: "Name",
                description: 'Test Transaction',
                handler: res => {
                    createVerify({ response: res }).then(() => {
                        getPaymentDetails({
                            razorpay_payment_id: res?.razorpay_payment_id
                        }).then(() => {
                            setPayment(true)
                        })
                    })
                },
                prefill: {
                    name: "Name",
                    email: "Email",
                    contact: "0909"
                },
                notes: {
                    address: 'Neosoft'
                },
                theme: {
                    color: '#3399cc'
                }
            }
            console.log(options);
            const rzpay = new window.Razorpay(options)
            rzpay.open()
        },
        [Razorpay]
    )


    const displayRazorpay = (e) => {
        e.preventDefault()

        axios.get("http://localhost:5000/api/get")
            .then((res) => {
                console.log(res);
                handleRazorPayment(res);
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src="" className="App-logo" alt="logo" />
                <p>Buy React now!</p>
                <button className="App-link" onClick={displayRazorpay}>
                    Pay ₹500
                </button>
            </header>
        </div>
    )
}



export default Payment;