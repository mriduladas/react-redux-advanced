import  { createSlice } from "@reduxjs/toolkit";
//import { uiActions } from "./ui-slice";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {items : [], totalQuantity:0, changed: false },
    reducers:{
        replaceCart(state, actions){
            state.totalQuantity = actions.payload.totalQuantity;
            state.items= actions.payload.items;
        },
        addItemsToCart(state,actions){
            state.changed=true;
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
            state.changed=true;
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


export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
