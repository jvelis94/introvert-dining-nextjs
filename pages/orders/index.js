import { useEffect, useRef, useState } from "react"
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Cookies, useCookies } from 'react-cookie';
import styles from '../../components/Orders.module.css'


const Orders = (props) => {
    const [orders, setOrders] = useState([])
    const emailRef = useRef()
    const [cookies, setCookie, removeCookie] = useCookies(['email']);

    useEffect(() => {
        if (cookies.email) {
            emailRef.current.value = cookies.email
        } 
        
    }, [])

    const handleEmailSubmit = async (e) => {
        e.preventDefault()
        const email = emailRef.current.value
        const response = await axios.get(`${process.env.API_URL}/api/orders?email=${email}`)
        console.log(response.data)
        setOrders(response.data)
    }

    const formatDates = (inputDate) => {
        let date = new Date(inputDate)
        return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
    }

    return (
        <div className={styles.ordersIndex}>
            <div className={styles.ordersSearchContainer}>
                <h1>Lets find your most recent orders:</h1>
                <form onSubmit={handleEmailSubmit} >
                    <input ref={emailRef} className={styles.ordersSearchInput} placeholder="input email" />
                    <input type="submit" value="Search" className={styles.ordersSearchBtn}/>
                </form>
            </div>
            <div>
                {orders.map(order => (
                    <Link key={order.id} href={`/orders/${order.id}`} passHref>
                        <div className={styles.orderContainer} >
                            <h4 style={{margin: '8px 0px'}}>{formatDates(order.created_at)}</h4>
                            <div className={styles.orderDetails}>
                                <p style={{margin:0}}>{order.order_items.length } {order.order_items.length > 1 ? "items" : "item"}</p>
                                <p style={{margin:0}}>{order.isPaid ? "Paid" : "Unpaid"}</p>
                            </div>
                        </div>
                    </Link>
                    
                    
                ))}
            </div>
        </div>
    )
    

}

export default Orders
