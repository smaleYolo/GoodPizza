import React, {useEffect} from 'react';
import happyPizza from "../assets/img/pizza1_L2.png";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {clearCartItems} from "../redux/slices/cartSlice";

const OrderComplete = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearCartItems())
    },[dispatch])

    return (
        <div className="content">
            <div className="container container--cart">
                <div className="cart cart--empty">
                    <h2>Спасибо за Ваш заказ!</h2>
                    <p>
                        Будем с нетерпением ждать Вас снова!
                    </p>
                    <img src={happyPizza} alt="Empty cart"/>
                    <Link to="/" className="button button--black">
                        <span>Оформить новый заказ</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderComplete;