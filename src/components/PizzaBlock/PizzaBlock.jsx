import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addCartItem, selectCartItemById} from "../../redux/slices/cartSlice";
import {Link} from "react-router-dom";

const PizzaBlock = ({id, title, price, imageUrl, types, sizes}) => {
    const typeNames = ['Тонкое', 'Традиционное'];
    const [activeType, setActiveType] = React.useState(0);
    const [activeSize, setActiveSize] = React.useState(0);

    //реализация в слайсе. Мы вызываем селектор с айди, с которым выполняется функция
    const cartItem = useSelector(selectCartItemById(id))

    const dispatch = useDispatch()

    const onClickAdd = () => {
        dispatch(addCartItem({
            id,
            title,
            price,
            imageUrl,
            type: typeNames[activeType],
            size: sizes[activeSize],
        }))
    }

    return (
        <div className="pizza-block-wrapper">
            <div className="pizza-block">
                <Link to={`/pizza/${id}`}>
                    <img
                        className="pizza-block__image"
                        src={imageUrl}
                        alt="Pizza"
                    />
                </Link>
                <h4 className="pizza-block__title">{title}</h4>
                <div className="pizza-block__selector">
                    <ul>
                        {
                            types.map((typeId) => (
                                <li
                                    key={typeId}
                                    className={activeType === typeId ? 'active': ''}
                                    onClick={() => setActiveType(typeId)}
                                >
                                    {typeNames[typeId]}
                                </li>
                            ))
                        }
                    </ul>
                    <ul>
                        {
                            sizes.map((size, i) => (
                                <li
                                    key={size}
                                    className={activeSize === i ? 'active' : ''}
                                    onClick={() => setActiveSize(i)}
                                >
                                    {size} см.
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {price} ₽</div>

                    <button className="button button--outline button--add" onClick={onClickAdd}>
                        <>
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                    fill="white"
                                />
                            </svg>
                        </>
                        <span>Добавить</span>
                        {cartItem && <i>{cartItem.count}</i>}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default PizzaBlock;