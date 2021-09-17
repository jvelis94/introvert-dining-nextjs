import { useRef, useState } from "react"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie';

const Orders = (props) => {
    const [orders, setOrders] = useState([])
    const emailRef = useRef()

    const handleEmailSubmit = async (e) => {
        e.preventDefault()
        const email = emailRef.current.value
        const response = await axios.get(`http://localhost:3000/api/orders?email=${email}`)
        setOrders(response.data)
    }

    return (
        <div>
            <h1>Lets lok for your most recent orders</h1>
            <form onSubmit={handleEmailSubmit} >
                <input ref={emailRef} />
                <input type="submit" />
            </form>
            <div>
                {orders.map(order => (
                    <Link key={order.id} href={`/orders/${order.id}`}>
                        <a>{order.id}</a>
                    </Link>
                    
                    
                ))}
            </div>
        </div>
    )
    

}

export default Orders
