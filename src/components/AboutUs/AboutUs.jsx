import React from 'react';
import {Link} from "react-router-dom";

import map from '../../assets/img/map.png';


const AboutUs = () => {
    return (
        <div className="content">
            <div className="container container--cart" style={{ textAlign: 'center' }}>
                <div className="cart">
                    <h1>Мы</h1>
                    <p style={{ paddingBottom: 30}}>
                        Обычно люди приходят в Good Pizza, чтобы просто поесть.
                        Наши промоутеры раздают листовки про кусочек пиццы за двадцать рублей или ещё что-то выгодное.
                        Мы делаем это как первый шаг, чтобы познакомиться.

                        Но для нас Good Pizza — не только пицца.
                        Это и пицца тоже, но в первую очередь это большое дело, которое вдохновляет нас,
                        заставляет каждое утро просыпаться и с интересом продолжать работу.
                    </p>
                    <div>
                        <img src={map} alt="Map" width={"80%"} style={{ border: '1px solid black',
                            borderRadius: '20px', marginBottom: 30}}/>
                    </div>

                     <Link to="/" className="button button--black">
                        <span>К пиццам!</span>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default AboutUs;