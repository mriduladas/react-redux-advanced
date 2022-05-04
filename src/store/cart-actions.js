import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () =>{
    return async (dispatch) => {
        const fetchdata = async ()=> {
            const response = await fetch('https://react-http-78b8b-default-rtdb.firebaseio.com/cart.json');
            if(!response.ok){
                throw new Error('Error in fetching data');
            }
            const data = await response.json();
            return data;
        }
        try{
            const cartData = await fetchdata();
            dispatch(cartActions.replaceCart(cartData));
            console.log("cartData", cartData);
        }catch(error){
            dispatch(uiActions.showNotification({
                status: 'error',
                title:'error...',
                message: 'error in sending cart data'
              }))
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title:'sending...',
            message: 'sending cart data'
          }))
        const sendRequest = async () => {
            const response = await fetch('https://react-http-78b8b-default-rtdb.firebaseio.com/cart.json', 
            {
              method: 'PUT',
              body: JSON.stringify(cart)
            });
          if(!response.ok){
          //Here only one error can be handled. That is response is not 200. 
          throw new Error('Sending Cart Data Failed')
          }
          //const responseData = await response.json();
        }
        try{
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: 'success',
                title:'Success!',
                message: 'Succesfully sent cart data'
            }))
        }catch(error){
            dispatch(uiActions.showNotification({
                status: 'error',
                title:'error...',
                message: 'error in sending cart data'
              }))
        }
    

        
    }
}