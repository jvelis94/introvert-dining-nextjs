import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useState } from 'react';
import NewOrderModal from '../components/NewOrderModal';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router'




export default function Home() {
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => {
    cookies.email ? router.push('/menu') : setOpen(true);
  }

  const handleClose = () => setOpen(false);

  return (
      <div className={styles.container}>
        <Head>
          <title>Introvert Dining</title>
          <meta name="description" content="Restaurant order app for introverts" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to My Restaurant App
          </h1>
          <br/>
          <NewOrderModal handleOpen={handleOpen} handleClose={handleClose} open={open}/>
          <button className={styles.orderBtn} onClick={handleOpen} >
            Place an order
          </button>
        </main>
      </div>
  )
}
