import '../styles/globals.css'
// import CartLayout from '../components/Layout/CartLayout'
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const CartLayout = dynamic(() => import('../components/Layout/CartLayout'))


function MyApp({ Component, pageProps }) {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const router = useRouter()

  return (
    <>
      {cookies.order_id && router.pathname != ('/orders/[pid]' || '/menu') && <CartLayout order_id={cookies.order_id} orderItemsCount={cookies.order_items_count}/>}
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
