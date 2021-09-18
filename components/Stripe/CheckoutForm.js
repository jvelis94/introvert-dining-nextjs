import React, {Component, useState} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'

const CheckoutForm = (props) => {
    const [complete, setComplete] = useState(props.isPaid)

    const handleSubmit = async (e) => {
        e.preventDefault()
        let token = await props.stripe.createToken({name: 'Name'})
        let response = await fetch(`${process.env.API_URL}/api/charges`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token.token.id,
                order_id: props.order_id
            })
        })

        if (response.ok) {
            setComplete(true)
        }
    }

    const successfulPurchaseUI = <h1 style={{textAlign:'center'}}>Purchase Complete</h1>

    const paymentUI = (
        <div className='checkout' >
            <p>complete your purchase below:</p>
            <hr/>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <hr/>
                <button type='submit'>Pay</button>
            </form>
        </div>
    )

    return (
        <div>
            {complete ? successfulPurchaseUI : paymentUI}
        </div>
    )

}

export default injectStripe(CheckoutForm)