import styles from './MenuNavItem.module.css'
import Image from 'next/image'
import appetizers from '../../public/icons/appetizers.svg'
import beers from '../../public/icons/beers.svg'
import burgers from '../../public/icons/burgers.svg'
import cocktails from '../../public/icons/cocktails.svg'
import salads from '../../public/icons/salads.svg'
import sides from '../../public/icons/sides.svg'
import sweets from '../../public/icons/sweets.svg'
import wings from '../../public/icons/wings.svg'

const MenuNavItem = (props) => {
    const menuIcons = {
        "Appetizers": appetizers,
        "Wings": wings,
        "Burgers": burgers,
        "Sides": sides,
        "Beers": beers,
        "Cocktails": cocktails,
        "Salads": salads,
        "Sweets": sweets
    }
    
    let buttonClass = (props.activeCategory === props.category) ? styles.buttonActive : styles.buttonInactive
    let selectedSvgIcon = menuIcons[props.category]
    

    return (
        <div
            className={`${styles.buttonDefault} ${buttonClass}`} 
            onClick={() => props.changeActiveItem(props.category)}
            >
            <div className={styles.imageContainer}>
                <Image 
                    src={selectedSvgIcon}
                    alt="menu-item" 
                    width={25}
                    height={25}
                />
            </div>
            <span className={styles.svgIconSpanSpacing}>{props.category}</span>

        </div>
    )
}

export default MenuNavItem