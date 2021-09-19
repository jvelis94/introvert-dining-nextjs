import React, {useContext, useEffect, useState} from 'react'
import MenuItem from '../components/MenuItems/MenuItem'
import MenuNav from '../components/UI/MenuNav'
import MenuSearch from '../components/UI/MenuSearch'
import OrderContext from '../store/order-context'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie';
import NewOrderModal from '../components/NewOrderModal'
import dynamic from 'next/dynamic'
const CartLayout = dynamic(() => import('../components/Layout/CartLayout'))

const Menu = (props) => {
    const menuCategories = ["Appetizers", "Wings", "Burgers", "Sides", "Beers", "Cocktails", "Salads", "Sweets"]
    const [activeCategory, setActiveCategory] = useState('Appetizers');
    const [currentSearchResults, setCurrentSearchResults] = useState([])
    const [openSearchResults, setOpenSearchResults] = useState(false);
    const ctx = useContext(OrderContext)
    const [cookies, setCookie, removeCookie] = useCookies(['email']);
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [orderItemsCount, setOrderItemsCount] = useState(cookies.order_items_count)
    

    useEffect(() => {
      console.log('in useeffect')
      if (!cookies.email) {
        setOpen(true)
      }
    }, [cookies])
  
    const changeActiveItem = (category) => {
      setActiveCategory(category)
    }

    const handleMenuSearchInput = (searchInput) => {
      if (searchInput.length > 2) {
        setOpenSearchResults(true)
        let searchResults = props.data.filter(item => {
          let itemFlattened = item.name.toLowerCase()
          return itemFlattened.includes(searchInput.toLowerCase())
        })
        setCurrentSearchResults(searchResults)
      } else {
        setOpenSearchResults(false)
      }
    }
  
    const handleCloseSearchResults = () => {
      setOpenSearchResults(false);
    };


    const handleOrderItemsCount = () => {
      console.log("in handleOrderItemsCount")
      setOrderItemsCount(prevState => parseInt(prevState) + 1)
    }

    

    const searchResultsContainer = (
      <div>
          {currentSearchResults.map(item => (
            <MenuItem key={item.id} item={item} handleOrderItemsCount={handleOrderItemsCount}/>
          ))}
      </div>
    )
    const allResultsFilterable = (
      <div>
        <MenuNav categories={menuCategories} activeCategory={activeCategory} changeActiveItem={changeActiveItem}/>
        
        {props.data.filter(item => item.category === activeCategory).map(item => (
          <MenuItem key={item.id} item={item} handleOrderItemsCount={handleOrderItemsCount}/>
        ))}
      </div>
    )

    return (
      
      <div>
        {cookies.order_id && <CartLayout orderItemsCount={orderItemsCount} order_id={cookies.order_id}/>}
        <div style={{position: 'relative', zIndex: 1}}>
          <NewOrderModal handleOpen={handleOpen} handleClose={handleClose} open={open}/>
          <MenuSearch handleMenuSearchInput={handleMenuSearchInput} handleCloseSearchResults={handleCloseSearchResults}/>
          { openSearchResults ? searchResultsContainer : allResultsFilterable }
        </div>
      </div>
    )
}




export async function getStaticProps(context) {
    const response = await fetch(`${process.env.API_URL}/api/food_items`)
    if (response.status != 200) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    } else {
      const menuItems = await response.json()
      return {
        props: {
          data: menuItems,
        },
      };
    }
  }



export default Menu