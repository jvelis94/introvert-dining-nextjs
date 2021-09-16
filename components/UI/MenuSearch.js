import React, { useRef } from 'react';
import styles from './MenuSearch.module.css'
import ClearIcon from '@material-ui/icons/Clear';

const MenuSearch = (props) => {
  const menuSearchRef = useRef()

  const handleInputChange = () => {
    props.handleMenuSearchInput(menuSearchRef.current.value)
  }

  const handleClearIconClick = () => {
    props.handleCloseSearchResults()
  }

  return (
    <div className={styles.menuSearch_container} >
      <input ref={menuSearchRef} type="text" placeholder="Search menu items..."  className={styles.menuSearch_bar} onChange={handleInputChange}/>
      <ClearIcon onClick={handleClearIconClick}/>
    </div>
  )
}

export default MenuSearch
