import {createSlice} from "@reduxjs/toolkit";


export const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        categoryId: 0,
        currentPage: 1,
        sortType: 0
    },
    reducers: {
        setCategoryId: (state, action) => {
            state.categoryId = action.payload;
        },
        setSortType: (state, action) => {
            state.sortType = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setFilters: (state, action) => {
            state.currentPage = Number(action.payload.currentPage);
            state.categoryId = Number(action.payload.categoryId);
            state.sortType = Number(action.payload.sortType);
        }
    }
})

export const selectFilter = state => state.filter;

export const {setCategoryId, setSortType, setCurrentPage, setFilters} = filterSlice.actions;

export default filterSlice.reducer;