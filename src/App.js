import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { fetchCartData, sendCartData } from './store/cart-actions';


let isInitial = true;

function App() {

  const showCart =useSelector(state => { console.log(state); return state.ui.cartIsVisible})
  const showNotification = useSelector(state => state.ui.showNotification);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  console.log(cart);

  useEffect(()=>{
    dispatch(fetchCartData());
  },[dispatch])

  useEffect(()=> {

    if(isInitial){
      isInitial= false;
      return;
    }

    dispatch(sendCartData(cart));
  }, [cart,dispatch]);
  return (
    <Fragment>
    {showNotification && <Notification status={showNotification.status} title={showNotification.title} message= {showNotification.message}/>}
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;
