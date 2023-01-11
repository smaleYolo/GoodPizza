import React from 'react';
import {setCategoryId} from "../redux/slices/filterSlice";
import {useDispatch} from "react-redux";


const Categories = ({categories, categoryId}) => {

    const dispatch = useDispatch()
    const onClickCategory = (index) => {
        dispatch(setCategoryId(index))
    }

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((value, i) => (
                        <li
                            key={i}
                            className={(categoryId === i) ? 'active' : ''}
                            onClick={() => onClickCategory(i)}
                        >
                            {value}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Categories;