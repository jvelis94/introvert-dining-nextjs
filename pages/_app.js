import '../styles/globals.css'
import { OrderContextProvider } from '../store/order-context'

function MyApp({ Component, pageProps }) {
  return (
    <OrderContextProvider>
      <Component {...pageProps} />
    </OrderContextProvider>
  )
}

export default MyApp
