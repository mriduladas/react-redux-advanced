import  { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {items : [], totalQuantity:0 },
    reducers:{
        addItemsToCart(state,actions){
            state.totalQuantity++;
            const newItem =actions.payload;
            const existingItem = state.items.find(item => item.id ===newItem.id);
            if(!existingItem){
                state.items.push({
                    id: newItem.id, 
                    price: newItem.price, 
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title })
            }else{
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        removeItemsFromCart(state, actions){
            const itemId = actions.payload;
            state.totalQuantity--;
            const existingItem = state.items.find(item => item.id === itemId);
            console.log(existingItem);
            if(existingItem.quantity===1){
                state.items = state.items.filter(item => item.id !== itemId);
            }else{
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }

        }
    }
})

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
          const responseData = await response.json();
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


export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
