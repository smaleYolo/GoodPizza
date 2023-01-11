import {createSlice} from "@reduxjs/toolkit";

const setTotalStates = (state) => {
    state.totalPrice = state.cartItems.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum
    },0);

    state.totalCount = state.cartItems.reduce((sum, item) => item.count + sum, 0)
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        totalPrice: 0,
        totalCount: 0,
    },
    reducers: {
        addCartItem: (state, action) => {
            const findItem = state.cartItems.find(obj => obj.id === action.payload.id)

            if(findItem){
                findItem.count++;
            } else {
                state.cartItems.push({
                    ...action.payload,
                    count: 1
                });
            }

            setTotalStates(state)
        },
        removeCartItem: (state, action) => {
            const findItem = state.cartItems.find(obj => obj.id === action.payload.id)

            if(findItem.count > 1){
                findItem.count--;
            } else {
                state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== action.payload.id);
            }

            setTotalStates(state)
        },
        removeCartPizzas: (state, action) => {
            state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== action.payload.id);
            setTotalStates(state)
        },
        clearCartItems: (state) => {
            state.cartItems = [];
            setTotalStates(state)
        },
    }
})

export const selectCart = state => state.cart;
export const selectCartItemById = (id) => (state) => state.cart.cartItems.find(obj => obj.id === id)

export const { addCartItem, removeCartItem, clearCartItems, removeCartPizzas } = cartSlice.actions;

export default cartSlice.reducer;