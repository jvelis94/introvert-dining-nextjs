import React, { useEffect, useMemo, useState, useCallback, useContext, useReducer } from "react";
import { useCookies } from 'react-cookie';

const OrderContext = React.createContext({
    total: 0,
    currentOrder: {},
    orderItems: [],
    addToCart: (item) => {},
    incrementQuantity: (item) => {},
    decrementQuantity: (item) => {},
    removeCartItem: (item) => {}
});

const initialOrderState = {
    id: null,
    createdAt: null,
    updatedAt: null,
    status: "open",
    subtotal: 0,
    tax: 0,
    tip: 0,
    total: 0,
    orderItems: [],
    userId: 1
}

export const OrderContextProvider = (props) => {
    const [currentOrder, setCurrentOrder] = useState(initialOrderState)
    const [addedNewOrderItem, setAddedNewOrderItem] = useState(false)
    const [total, setTotal] = useState(0)
    const [cookies, setCookie, removeCookie] = useCookies(['email']);

    useEffect(() => {
        // fetch('/api/cart')
        //     .then(response => response.json())
        //     .then(data => {
        //         setCurrentOrder(data)
        //         let totalBillArray = data['orderItems'].map(item => (item.product.price * item.quantity))
        //         setTotal(totalBillArray.reduce((a,b) => a+b))
        //     })
        setAddedNewOrderItem(false)
    }, [addedNewOrderItem])


    const addToCart = async (product) => {
        console.log(total)
        console.log(`adding ${product.name} to cart`)
        let itemInOrderCheck = currentOrder['orderItems'].find(orderItem => orderItem['product']['id'] === product.id)
        if (currentOrder['orderItems'].length > 0 && itemInOrderCheck) {
            console.log('running if statement inside cart')
            incrementQuantity(itemInOrderCheck)
            return
        }

        const newOrderItem = {
            orderId: currentOrder.id || "",
            product: product,
        }
        
        try {
            // let response = await fetch("/api/cart", {
            //     method: "POST",
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(newOrderItem),
            // })
            // console.log(response)
            setAddedNewOrderItem(true)
        } catch (error) {
            console.error(error)
        }
    }
    
    const incrementQuantity = async (item) => {
        let orderItem = currentOrder['orderItems'].find(order => order['product']['id'] === item.product.id)
        orderItem['quantity'] += 1
        let updateIndex = currentOrder['orderItems'].indexOf(item)

        try {
            const body = orderItem
            // await fetch("/api/cart", {
            //     method: "PATCH",
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(body),
            // })
            setAddedNewOrderItem(true)
        } catch (error) {
            console.error(error)
        }
    }

    const decrementQuantity = async (item) => {
        let updateIndex = currentOrder['orderItems'].indexOf(item)
        let orderItem = currentOrder['orderItems'].find(order => order['product']['id'] === item.product.id)
        if (orderItem['quantity'] === 1) {
            removeCartItem(item)
            return
        }
        else {
            orderItem['quantity'] -= 1
        }
        try {
            const body = orderItem
            // await fetch("/api/cart", {
            //     method: "PATCH",
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(body),
            // })
            setAddedNewOrderItem(true)
        } catch (error) {
            console.error(error)
        }
    }
    
    const removeCartItem = async (item) => {
        let orderItem = currentOrder['orderItems'].find(order => order['product']['id'] === item.product.id)

        try {
            const body = orderItem
            // await fetch("/api/cart", {
            //     method: "DELETE",
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(body),
            // })
            setAddedNewOrderItem(true)
        } catch (error) {
            console.error(error)
        }
        return
    }


    return (
        <OrderContext.Provider
            value={{
                total: total,
                currentOrder: currentOrder,
                addToCart: addToCart,
                incrementQuantity: incrementQuantity,
                decrementQuantity: decrementQuantity,
                removeCartItem: removeCartItem
            }}
        >
            {props.children}
        </OrderContext.Provider>
    )

}

export default OrderContext