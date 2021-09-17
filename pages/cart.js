import CartTable from "../components/Cart/CartTable"
import axios from 'axios'
import { useEffect } from "react"


const Cart = (props) => {
    

    return (
        <CartTable currentOrder={props.order} />
    )
}

export async function getServerSideProps(context) {
    // Get external data from the file system, API, DB, etc.
    
    const response = await axios.get(`${process.env.API_URL}/api/orders/${context.req.cookies.order_id}`)
    
    return {
        props: { order: response.data }
    }
    
  
}

export default Cart
