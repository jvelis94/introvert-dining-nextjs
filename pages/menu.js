import React, {useContext, useEffect, useState} from 'react'
import MenuItem from '../components/MenuItems/MenuItem'
import MenuNav from '../components/UI/MenuNav'
import MenuSearch from '../components/UI/MenuSearch'
import OrderContext from '../store/order-context'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie';

const Menu = (props) => {
    const menuCategories = ["Appetizers", "Wings", "Burgers", "Sides", "Beers", "Cocktails", "Salads", "Sweets"]
    const [activeCategory, setActiveCategory] = useState('Appetizers');
    const [currentSearchResults, setCurrentSearchResults] = useState([])
    const [openSearchResults, setOpenSearchResults] = useState(false);
    const ctx = useContext(OrderContext)
    const [cookies, setCookie, removeCookie] = useCookies(['email']);
    const router = useRouter()

    useEffect(() => {
      if (!cookies.email) {
        router.push('/new_order')
      }
    })
  
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

    
    const searchResultsContainer = (
      <div>
          {currentSearchResults.map(item => (
            <MenuItem key={item.id} item={item} />
          ))}
      </div>
    )

    const allResultsFilterable = (
      <div>
        <MenuNav categories={menuCategories} activeCategory={activeCategory} changeActiveItem={changeActiveItem}/>
        
        {props.data.filter(item => item.category === activeCategory).map(item => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    )

    return (
      <div>
        <div>
          <MenuSearch handleMenuSearchInput={handleMenuSearchInput} handleCloseSearchResults={handleCloseSearchResults}/>
          { openSearchResults ? searchResultsContainer : allResultsFilterable }
        </div>
      </div>
    )
}

export async function getStaticProps(context) {
    const response = await fetch("http://localhost:3000/api/food_items")
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