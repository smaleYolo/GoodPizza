import {configureStore} from "@reduxjs/toolkit";
import pizzasReducer from './slices/pizzasSlice';
import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import viewsReducer from "./slices/viewsSlice";


export const store = configureStore({
    reducer: {
        pizzas: pizzasReducer,
        filter: filterReducer,
        cart: cartReducer,
        views: viewsReducer,
    }
})