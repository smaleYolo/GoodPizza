import React from 'react';
import styles from './NotFoundBlock.module.scss'
import {Link} from "react-router-dom";

const NotFoundBlock = () => {
    return (
        <div className={styles.root}>
            <h1>
                <Link to='/'><span>😕</span></Link>
                <br/>
                Ничего не найдено
            </h1>
            <p className={styles.description}>К сожалению, данная страница отсутствует в прекрассном магазине пицццц</p>
        </div>
    );
};

export default NotFoundBlock;