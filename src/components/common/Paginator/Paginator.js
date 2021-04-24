import React, { useState } from 'react';

import './Paginator.scss';

const Paginator = ({ totalItemsCount, usersCount, userPage, onClickSetActivePage, portionSize = 30 }) => {
    let pagesCount = Math.ceil(totalItemsCount / usersCount);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [ portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let righnPortionPageNumber = portionNumber * portionSize;

    return (
        <div className='pages'>
            {
                portionNumber > 1 &&
                <button onClick={() => { setPortionNumber(portionNumber - 1) }}>Prev</button>}
            {
                pages
                .filter(portion=> portion >= leftPortionPageNumber && portion <= righnPortionPageNumber)
                .map(page => {
                    return <span
                        className={userPage === page ? 'page-number selected-page' : 'page-number'}
                        onClick={() => { onClickSetActivePage(page) }}
                        key={page}
                    >
                        {page}
                    </span>
                })
            }
            {
                portionCount > portionNumber &&
                <button onClick={() => { setPortionNumber(portionNumber + 1) }}>Next</button>
            }
        </div>
    )
}

export default Paginator;