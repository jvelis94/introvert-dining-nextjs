import React, {useState, useMemo, useEffect} from 'react';
import styles from './CartTable.module.css'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useCookies } from 'react-cookie';
import axios from 'axios'

const CartTable = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [order, setOrder] = useState(props.currentOrder)
    const sortedOrderItems = order.order_items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

    const incrementQuantity = async (item) => {
        const data = { order_id: props.currentOrder.id, item_action: "increment"}
        const response = await axios(
            {   method: 'patch', 
                url: `${process.env.API_URL}/api/orders/${props.currentOrder.id}/order_items/${item.id}`, 
                data: data
            })
        console.log(response.data)
        setOrder(response.data)
    
    }

    const decrementQuantity = async (item) => {
        if (item.quantity > 1) {
            const data = { order_id: props.currentOrder.id, item_action: "decrement"}
            const response = await axios(
                {   method: 'patch', 
                    url: `${process.env.API_URL}/api/orders/${props.currentOrder.id}/order_items/${item.id}`, 
                    data: data
                })
    
            setOrder(response.data)
        }
    }

    const removeItem = async (item) => {
        const data = { order_id: props.currentOrder.id, item_action: "decrement"}
        const response = await axios(
            {   method: 'delete', 
                url: `${process.env.API_URL}/api/orders/${props.currentOrder.id}/order_items/${item.id}`, 
                data: data
            })
        
        setOrder(response.data)
    }

    if (sortedOrderItems && sortedOrderItems.length < 1) {
        return (
            <h2>No items in your cart at this time</h2>
        )
    }


    return (
        <>
        <h1 style={{textAlign:'center'}}>Cart</h1>
        <table className={styles.cartTable}>
            <thead>
                <tr className={styles.cartTableHeadersRow}>
                    <td className={`${styles.cartTableQtyColumns} ${styles.cartTableHeaders}`}>Qty</td>
                    <td className={styles.cartTableNameColumns}>Name</td>
                    <td className={`${styles.cartTablePriceColumns} ${styles.cartTableHeaders}`}>Price</td>
                    <td className={styles.cartTableRemoveColumns}></td>
                </tr>
            </thead>
            <tbody>
                {sortedOrderItems.map(orderItem => (
                    <tr key={orderItem.id} >
                        <td className={styles.cartTableQtyColumns}>
                            <div className={styles.quantityControls}>
                                <RemoveIcon 
                                    className={styles.incrementDecrementBtn} 
                                    onClick={()=>decrementQuantity(orderItem)} 
                                    color={orderItem.quantity === 1 ? 'disabled' : 'inherit'} style={{fontSize: 'medium'}}
                                    disabled={orderItem.quantity === 1 ? true : false}
                                    />
                                <span style={{color: 'white'}}>{orderItem.quantity}</span>
                                <AddIcon 
                                    className={styles.incrementDecrementBtn} 
                                    onClick={()=>incrementQuantity(orderItem)} 
                                    style={{fontSize: 'medium'}}
                                />
                            </div>
                        </td>
                        <td className={styles.cartTableNameColumns}>{orderItem.food_item.name}</td>
                        <td className={styles.cartTablePriceColumns}>{orderItem.food_item.price}</td>
                        <td className={styles.cartTableRemoveColumns} onClick={()=>removeItem(orderItem)}>Remove</td>
                    </tr>
                ))}
                    {/* <tr className={styles.cartTableTotalRow} style={{backgroundColor: '#fff7e5'}}>
                        <td colSpan={2} className={styles.cartTableNameColumns}>Subtotal</td>
                        <td className={styles.cartTablePriceColumns}>{order.subtotal}</td>
                        <td></td>
                    </tr> */}
                    <tr className={styles.cartTableTotalRow}>
                        <td colSpan={2} className={styles.cartTableNameColumns}>Total</td>
                        <td className={styles.cartTablePriceColumns}>${order.total}</td>
                        <td></td>
                    </tr>
            </tbody>
        </table>
        </>
    )
}

export default CartTable

