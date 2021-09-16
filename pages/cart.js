import { useContext } from "react"
import CartTable from "../components/Cart/CartTable"
import OrderContext from "../store/order-context"

const Cart = (props) => {
    const ctx = useContext(OrderContext)

    return (
        // <CartTable currentOrder={ctx.currentOrder} orderItems={ctx.orderItems} />
        <CartTable orderItems={ctx.currentOrder.orderItems} />
    )
}

export default Cart
