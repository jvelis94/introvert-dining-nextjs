import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link'
import styles from './CartLayout.module.css'
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';

const CartLayout = (props) => {
    // const [cookies, setCookie, removeCookie] = useCookies([]);


    return (
        <Link href={`/orders/${props.order_id}`} passHref>
            <div className={styles.cartIconContainer}>
                <div style={{position: 'relative', height:'100%', width: '100%'}}>
                    <ShoppingCartIcon className={styles.cartIcon} />
                    <h4 className={styles.cartCount}>{props.orderItemsCount}</h4>
                </div>
            </div>
        </Link>
    )
}

export default CartLayout