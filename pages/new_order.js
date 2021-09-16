import React, {useRef, useEffect, useState, useContext} from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { ColorizeTwoTone } from '@material-ui/icons'
import OrderContext from '../store/order-context'
import { useCookies } from 'react-cookie';

const NewOrder = (props) => {
    const emailRef = useRef()
    const router = useRouter()
    const ctx = useContext(OrderContext)
    const [cookies, setCookie, removeCookie] = useCookies(['email']);
  
    const handleEmailSubmit = async (e) => {
        e.preventDefault()
        const data = {email: emailRef.current.value }
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/api/orders',
            withCredentials: false,
            data: data
        })

        if (response.status === 200) {
            const order = response.data
            setCookie("email", emailRef.current.value, { 
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true 
            })
            router.push('/menu')

        }
    }

    return (
      <div>
        <form onSubmit={handleEmailSubmit}>
            <input ref={emailRef} />
            <input type="submit" />
        </form>
      </div>
    )
}

export default NewOrder