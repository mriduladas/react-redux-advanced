import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import classes from './CartItem.module.css';

const CartItem = (props) => {

  const dispatch = useDispatch();
  const { id,title, quantity, total, price } = props.item;

  const onAddItemToCart = () => {
    dispatch(cartActions.addItemsToCart({id:id, price:price,quantity:total, title:title}))
  }

  const onRemoveItemFromCart = () => {
    dispatch(cartActions.removeItemsFromCart(id));
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={onRemoveItemFromCart}>-</button>
          <button onClick={onAddItemToCart}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
