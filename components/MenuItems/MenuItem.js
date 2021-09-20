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
import meatball_sundae from '../../public/thumbnails/meatball-sundae.jpg'
import jalapeno_poppers from '../../public/thumbnails/jalapeno-poppers.jpg'
import pretzel_pops from '../../public/thumbnails/pretzel-pops.jpg'
import ahi_cupcakes from '../../public/thumbnails/ahi-cupcakes.jpg'
import skillet_mac from '../../public/thumbnails/skillet-mac.jpg'
import pimento_cheese from '../../public/thumbnails/pimento-cheese-dip.jpg'
import boneless_wings from '../../public/thumbnails/boneless-wings.jpg'
import house_salad from '../../public/thumbnails/house-salad.jpg'
import spicy_ahi from '../../public/thumbnails/spicy-ahi.jpg'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import React, {useState, useContext} from 'react';
import axios from 'axios'
import { useCookies } from 'react-cookie';


const MenuItem = (props) => {
    const { name, label, category, blurb, abv, details, origin, price, rating } = props.item
    let nameSplit = name.split(' ')
    let nameCapiTalizedEachWord = nameSplit.map(word => `${word[0].toUpperCase()}${word.substring(1)}`).join(' ')
    const [cookies, setCookie, removeCookie] = useCookies(['email']);


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

    console.log(name)

    let selectedJpgImage = menuItemImages[category]
    name === "meatball sundae" ? selectedJpgImage = meatball_sundae : selectedJpgImage
    name === "jalapeno popper grilled cheese" ? selectedJpgImage = jalapeno_poppers : selectedJpgImage
    name === "pretzel pops" ? selectedJpgImage = pretzel_pops : selectedJpgImage
    name === "ahi cupcakes" ? selectedJpgImage = ahi_cupcakes : selectedJpgImage
    name === "skillet mac n' cheese" ? selectedJpgImage = skillet_mac : selectedJpgImage
    name === "pimento cheese dip" ? selectedJpgImage = pimento_cheese : selectedJpgImage
    name === "boneless" ? selectedJpgImage = boneless_wings : selectedJpgImage
    name === "house salad" ? selectedJpgImage = house_salad : selectedJpgImage
    name === "spicy ahi" ? selectedJpgImage = spicy_ahi : selectedJpgImage

    const addToCart = async (item) => {
        console.log('adding to cart')
        console.log(cookies.order_id)
        const data = { order_id: cookies.order_id, food_item_id: item.id, price: item.price, quantity: 1 }
        const response = await axios.post(`${process.env.API_URL}/api/orders/${cookies.order_id}/order_items`, data)
        const order = response.data

        if (cookies.order_items_count) {
            console.log('IN COOKIES')
            setCookie("order_items_count", parseInt(cookies.order_items_count) + 1, { 
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true 
            })
            props.handleOrderItemsCount()
        } else {
            console.log('IN SET COOKIES')
            setCookie("order_items_count", 1, { 
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true 
            })
        }
        // console.log(order)



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