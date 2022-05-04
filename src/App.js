import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { uiActions } from './store/ui-slice';

let isInitial = true;

function App() {

  const showCart =useSelector(state => { console.log(state); return state.ui.cartIsVisible})
  const showNotification = useSelector(state => state.ui.showNotification);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  console.log(cart);

  useEffect(()=> {
    const sendDataToCart = async () => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title:'sending...',
        message: 'sending cart data'
      }))
      const response = await fetch('https://react-http-78b8b-default-rtdb.firebaseio.com/cart.json', 
      {
        method: 'PUT',
        body: JSON.stringify(cart)
      });

      if(!response.ok){
       //Here only one error can be handled. That is response is not 200. 
      }

      dispatch(uiActions.showNotification({
        status: 'success',
        title:'Success!',
        message: 'Succesfully sent cart data'
      }))
      const responseData = await response.json();
    }

    if(isInitial){
      isInitial= false;
      return;
    }

    sendDataToCart().catch((error)=>{
      dispatch(uiActions.showNotification({
        status: 'error',
        title:'error...',
        message: 'error in sending cart data'
      }))}
    )
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
