import React, {useState} from 'react'
import CartTable from '../../components/Cart/CartTable'
import axios from 'axios'
import { useEffect } from "react"
import CheckoutForm from '../../components/Stripe/CheckoutForm'

import dynamic from 'next/dynamic'
import Script from 'next/script'


const Elements = dynamic(() =>
import('react-stripe-elements').then((mod) => mod.Elements),
{ ssr: false }
)

const StripeProvider = dynamic(() =>
import('react-stripe-elements').then((mod) => mod.StripeProvider),
{ ssr: false }
)

const Order = (props) => {
    const [stripe, setStripe] = useState(null)


    return (
        <>  
            <Script
                id="stripe-js"
                src="https://js.stripe.com/v3/"
                onLoad={() => {
                setStripe(window.Stripe('pk_test_cvB2TzTSFRA1yj2DfTMOzDWF00NdilHh3O'))
                }}
            />
            <CartTable currentOrder={props.order} />
            <StripeProvider stripe={stripe}>
                <div>
                    <Elements>
                        <CheckoutForm order_id={props.order.id} isPaid={props.order.isPaid} />
                    </Elements>
                </div>
            </StripeProvider>

        </>
    )
}

export async function getServerSideProps(context) {
    // Get external data from the file system, API, DB, etc.
    
    const response = await axios.get(`${process.env.API_URL}/api/orders/${context.query.pid}`)
    
    return {
        props: { order: response.data }
    }
    
  
}

export default Order
