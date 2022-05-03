import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';


function App() {

  const showCart =useSelector(state => { console.log(state); return state.ui.cartIsVisible})

  const cart = useSelector(state => state.cart);
  console.log(cart);

  useEffect(()=> {
    fetch('https://react-http-78b8b-default-rtdb.firebaseio.com/cart.json', 
    {
      method: 'PUT',
      body: JSON.stringify(cart)
    });
  }, [cart]);
  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
