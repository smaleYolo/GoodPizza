import React from 'react';
import styles from './Pagination.module.scss'

const Pagination = ({currentPage, setCurrentPage}) => {

    return (
        <div className={styles.root}>
            {
                [...new Array(3)].map((_,i) => (
                    <b key={i} className={currentPage === i + 1 ? styles.current : styles.page} onClick={() => setCurrentPage(i + 1)}>
                        {i + 1}
                    </b>
                ))
            }
        </div>
    );
};

export default Pagination;