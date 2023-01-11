import React from 'react';
import cartEmpty from '../../assets/img/empty-cart.png';
import {Link} from "react-router-dom";

const InfoBlock = ({title, description, btn = ''}) => {
    return (
        <div className="content">
            <div className="container container--cart">
                <div className="cart cart--empty">
                    <h2>{title}</h2>
                    <p>
                        {description}
                    </p>
                    <img src={cartEmpty} alt="Empty cart"/>
                    {btn && <Link to="/" className="button button--black">
                        <span>{btn}</span>
                    </Link>}
                </div>
            </div>
        </div>
    );
};

export default InfoBlock;