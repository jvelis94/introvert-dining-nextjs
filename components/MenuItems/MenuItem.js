import menuItems from '../../data/MenuItems';
import styles from './MenuItem.module.css'
import Image from 'next/image'
import appetizers from '../../public/thumbnails/appetizers.jpg'
import beers from '../../public/thumbnails/beers.jpg'
import burgers from '../../public/thumbnails/burgers.jpg'
import cocktails from '../../public/thumbnails/cocktails.jpg'
import salads from '../../public/thumbnails/salads.jpg'
import sides from '../../public/thumbnails/sides.jpg'
import sweets from '../../public/thumbnails/sweets.jpg'
import wings from '../../public/thumbnails/wings.jpg'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import React, {useState, useContext} from 'react';
import OrderContext from '../../store/order-context';
import axios from 'axios'
import { useCookies } from 'react-cookie';


const MenuItem = (props) => {
    const { name, label, category, blurb, abv, details, origin, price, rating } = props.item
    let nameSplit = name.split(' ')
    let nameCapiTalizedEachWord = nameSplit.map(word => `${word[0].toUpperCase()}${word.substring(1)}`).join(' ')
    const [cookies, setCookie, removeCookie] = useCookies(['email']);

    const ctx = useContext(OrderContext)
    


    const menuItemImages = {
        "Appetizers": appetizers,
        "Wings": wings,
        "Burgers": burgers,
        "Sides": sides,
        "Beers": beers,
        "Cocktails": cocktails,
        "Salads": salads,
        "Sweets": sweets
    }

    let selectedJpgImage = menuItemImages[category]

    const addToCart = async (item) => {
        const data = { order_id: cookies.order_id, food_item_id: item.id, price: item.price, quantity: 1 }
        const response = await axios.post(`${process.env.API_URL}/api/orders/${cookies.order_id}/order_items`, data)
        const order = response.data

        console.log(order)



    }

    return (
        <div className={styles.menuItem_container}>
            <div className={styles.menuItem_image}>
                <Image 
                    src={selectedJpgImage}
                    alt="menu-item" 
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className={styles.menuItem_info}>
                <div className={styles.quantityContainer}>
                    <AddCircleOutlineIcon className={styles.addToCart} onClick={() => addToCart(props.item)}/>
                </div>
                <h2 className={styles.menuItem_h2}>{nameCapiTalizedEachWord}</h2>
                <p className={styles.menuItem_p}>{blurb}</p>
                <h3 className={styles.menuItem_h3}>${price}</h3>
            </div>
        </div>
    );
    
}

export default MenuItem