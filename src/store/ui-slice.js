import  { createSlice } from "@reduxjs/toolkit";


const uiSlice = createSlice({
    name: 'ui',
    initialState: {cartIsVisible : false, showNotification:null},
    reducers:{
        toggle(state){
            state.cartIsVisible = !state.cartIsVisible;
        },
        showNotification(state, actions){
            state.showNotification ={
                status: actions.payload.status,
                title: actions.payload.title,
                message: actions.payload.message
            }
        }
    }
})


export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
