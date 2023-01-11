import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchVisits = createAsyncThunk(
    'pizzas/fetchVisits',
    async function(_, {rejectWithValue}) {

        const url = 'https://63447a87dcae733e8fe00fff.mockapi.io/visits';

        try{
            const {data} = await axios.get(url)

            return data;

        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

// export const addView = createAsyncThunk(
//     'pizzas/addView',
//         async function (id, {rejectWithValue, getState}) {
//             const currentState = getState().views.totalVisits;
//
//             if(currentState){
//                 const response = await fetch(`https://63447a87dcae733e8fe00fff.mockapi.io/visits`,{
//                     method: 'PATCH',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         views: currentState.views + 1
//                     })
//                 })
//
//                 if(!response.ok){
//                     return rejectWithValue('Cant toggle new Task... Server Error!')
//                 }
//
//                 return id
//             }
//
//             return rejectWithValue('No such todo...')
//         }
// )

export const viewsSlice = createSlice({
    name: 'views',
    initialState: {
        totalVisits: []
    },
    reducers: {
        addNewVisit: (state) => {
            state.totalVisits = state.totalVisits + 1;
        },
    },
    extraReducers: {
        [fetchVisits.fulfilled]: (state, action) => {
            state.totalVisits = action.payload;
        }
    }
})


export const { addNewVisit } = viewsSlice.actions;

export default viewsSlice.reducer;