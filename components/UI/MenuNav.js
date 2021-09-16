import MenuNavItem from "./MenuNavItem"
import styles from "./MenuNav.module.css"

const MenuNav = (props) => (
    <div className={styles.menuNavContainer}>
        {props.categories.map(category => (
            <MenuNavItem 
                key={category} 
                category={category} 
                activeCategory={props.activeCategory}
                changeActiveItem={props.changeActiveItem} />
        ))}

    </div>
)

export default MenuNav