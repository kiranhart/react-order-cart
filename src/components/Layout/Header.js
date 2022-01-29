import HeaderCartButton from './HeaderCartButton';

import mealImage from '../../assets/meals.jpg';
import classes from './Header.module.css';

const Header = (props) => {
    return <>
        <header className={classes.header}>
            <h1>React Meals</h1>
            <HeaderCartButton onClick={props.onShowCart} />
        </header>
        <div className={classes['main-image']}>
            <img src={mealImage} alt="meals image" />
        </div>
    </>;
};

export default Header;
