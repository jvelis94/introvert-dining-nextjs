import * as React from 'react';
import Box from '@mui/material/Box';
import styles from "./NewOrderModal.module.css"
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #ffc534',
  boxShadow: 24,
  p: 4,
};

export default function NewOrderModal(props) {
    const emailRef = React.useRef()
    const router = useRouter()
    const [cookies, setCookie, removeCookie] = useCookies(['email']);
    
    const handleEmailSubmit = async (e) => {
        e.preventDefault()
        let orderCookie = null
        const findOrder = await axios.get(`http://localhost:3000/api/orders?email=${emailRef.current.value}`)
        if (findOrder.data.length > 0) {
            orderCookie = findOrder.data[0].id
        } else {
            const data = {email: emailRef.current.value }
            const newOrder = await axios({
                method: 'post',
                url: 'http://localhost:3000/api/orders',
                withCredentials: false,
                data: data
            })

            orderCookie = newOrder.data.id
        }
        
        setCookie("email", emailRef.current.value, { 
            path: "/",
            maxAge: 3600, // Expires after 1hr
            sameSite: true 
        })
        setCookie("order_id", orderCookie, { 
            path: "/",
            maxAge: 3600, // Expires after 1hr
            sameSite: true 
        })
        console.log('set cookies')
        props.handleClose()

        router.pathname === "/menu" ? reouter.reload : router.push('/menu')
    }

    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <p>It looks like you do not have an active session.</p>
                    <p>No worries, we only need your email to get started...</p>
                    <form onSubmit={handleEmailSubmit}>
                        <input ref={emailRef} className={styles.modalInput}/>
                        <input type="submit"  className={styles.modalSubmitBtn} />
                    </form>
                </Typography>
                </Box>
            </Modal>
        </div>
    );
}
