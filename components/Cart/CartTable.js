import React, {useContext, useState, useMemo, useEffect} from 'react';
import styles from './CartTable.module.css'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import OrderContext from '../../store/order-context';

const CartTable = (props) => {
    const ctx = useContext(OrderContext)
    const orderItems = ctx.currentOrder['orderItems'].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    // console.log('current order is..')
    // console.log(orderItems)

    const incrementQuantity = (item) => {
        ctx.incrementQuantity(item)
        // setQuantity(prevState => prevState + 1)
    }

    const decrementQuantity = (item) => {
        ctx.decrementQuantity(item)
        console.log(orderItems)
        // setQuantity(prevState => prevState - 1)
    }

    const removeItem = (item) => {
        ctx.removeCartItem(item)
    }

    if (orderItems && orderItems.length < 1) {
        return (
            <h2>No items in your cart at this time</h2>
        )
    }




    return (
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
                {orderItems.map(orderItem => (
                    <tr key={orderItem.product.id} >
                        <td className={styles.cartTableQtyColumns}>
                            <div className={styles.quantityControls}>
                                <RemoveIcon className={styles.incrementDecrementBtn} onClick={()=>decrementQuantity(orderItem)} color={orderItem.quantity === 1 ? 'disabled' : 'inherit'} style={{fontSize: 'medium'}}/>
                                <span style={{color: 'white'}}>{orderItem.quantity}</span>
                                <AddIcon className={styles.incrementDecrementBtn} onClick={()=>incrementQuantity(orderItem)} style={{fontSize: 'medium'}}/>
                            </div>
                        </td>
                        <td className={styles.cartTableNameColumns}>{orderItem.product.name}</td>
                        <td className={styles.cartTablePriceColumns}>{orderItem.product.price}</td>
                        <td className={styles.cartTableRemoveColumns} onClick={()=>removeItem(orderItem)}>Remove</td>
                    </tr>
                ))}
                    <tr className={styles.cartTableTotalRow}>
                        <td colSpan={2} className={styles.cartTableNameColumns}>Total</td>
                        <td className={styles.cartTablePriceColumns}>{ctx.total}</td>
                        <td></td>
                    </tr>
            </tbody>
        </table>
    )
}

export default CartTable

