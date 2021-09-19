import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link'
import styles from './CartLayout.module.css'

const CartLayout = (props) => {

    return (
        <Link href={`/orders/${props.order_id}`} passHref>
            <ShoppingCartIcon className={styles.cartIconContainer} />
        </Link>
    )
}

export default CartLayout