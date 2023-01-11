import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzas',
    async function({searchValue, categoryId, sortBy, category, currentPage}, {rejectWithValue}) {

        //фильтрация по searchValue делаю на фронте, так что при фильтрации - "текущая старница" работает некорректно
        //в категориях пагинации не будет, все выведется сразу
        const url = searchValue || categoryId
            ? `https://63447a87dcae733e8fe00fff.mockapi.io/pizzas?${sortBy}${category}`
            : `https://63447a87dcae733e8fe00fff.mockapi.io/pizzas?page=${currentPage}&limit=4${sortBy}${category}`;

        try{
            const {data} = await axios.get(url)

            return data;

        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

//делаем запрос всего ОДНОЙ пиццы и диспатчим значение внутри функции (для fullpizza.jsx)
//пердаем функцию navigate из хука, она переместит пользователя на главную, если пицца не найдена
export const fetchPizzasById = createAsyncThunk(
    'pizzas/fetchPizzasById',
    async function({id, navigate}, {dispatch, rejectWithValue}) {
        try{
            const {data} = await axios.get(`https://63447a87dcae733e8fe00fff.mockapi.io/pizzas/${id}`)

            return data;

        } catch (e) {
            navigate('/')
            return rejectWithValue(e.message)
        }
    }
)

export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState: {
        pizzas: [],
        pizzaById: [],
        status: 'loading',
        error: null,
    },
    reducers: {
        setPizzas: (state, action) => {
            state.pizzas = action.payload;
        },
        setPizzaById: (state, action) => {
            state.pizzaById = action.payload;
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
            state.pizzas = [];
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.status = 'success';
            state.pizzas = action.payload;
        },
        [fetchPizzas.rejected]: (state, action) => {
            state.status = 'error';
            state.error = action.payload;
            state.pizzas = [];
        },
        [fetchPizzasById.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
            state.pizzaById = [];
        },
        [fetchPizzasById.fulfilled]: (state, action) => {
            state.status = 'success';
            state.pizzaById = action.payload;
        },
        [fetchPizzasById.rejected]: (state, action) => {
            state.status = 'error';
            state.error = action.payload;
            state.pizzaById = [];
        },
    }
})

export const selectPizzas = state => state.pizzas;

export const {setPizzas, setPizzaById} = pizzasSlice.actions;

export default pizzasSlice.reducer;