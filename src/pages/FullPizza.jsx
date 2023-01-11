import React, {useEffect} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {fetchPizzasById} from "../redux/slices/pizzasSlice";
import {useDispatch, useSelector} from "react-redux";

const FullPizza = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const {pizzaById, status} = useSelector(state => state.pizzas)

    useEffect(() => {
        dispatch(fetchPizzasById({id, navigate}))
    },[dispatch,id,navigate])

    return (
        <div className="container">
            <div style={{ marginTop: 30}}>
                {status === 'success' ? (
                    // Желательно допилить отдельный компонент для карточки пиццы, сделать стили или вовсе вывести в модулку...
                    <div className="pizza-block" style={{  border: "2px solid gray", borderRadius: 10, padding: 20}}>
                        <img src={pizzaById.imageUrl} width={170} height={170} alt="Pizza"/>
                        <h2>{pizzaById.title}</h2>
                        <p>{pizzaById.price} руб.</p>
                        <Link to="/" className="button button--black" style={{ marginTop: 20}}>
                            <span>Вернуться назад</span>
                        </Link>
                    </div>
                ) : (
                    <h2>Идет загрузка...</h2>
                )}
            </div>
        </div>
    );
};

export default FullPizza;