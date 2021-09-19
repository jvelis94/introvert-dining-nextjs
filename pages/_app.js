import '../styles/globals.css'
import { OrderContextProvider } from '../store/order-context'
import CartLayout from '../components/Layout/CartLayout'
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const router = useRouter()

  return (
    <OrderContextProvider>
      {cookies.order_id && router.pathname != '/orders/[pid]' && <CartLayout order_id={cookies.order_id}/>}
      <Component {...pageProps} />
    </OrderContextProvider>
  )
}

export default MyApp
