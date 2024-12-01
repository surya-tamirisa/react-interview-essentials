/*
Question: Create a React application to display stock prices and manage a watchlist.

Requirements:
1. The application should:
   - Display a list of stocks with their name, symbol, and price.
   - Allow users to add stocks to a watchlist.

2. Watchlist functionality:
   - Enable users to add stocks from the main list to the watchlist.
   - Provide a way to remove stocks from the watchlist.

3. Stock data:
   - Use a predefined set of stock data, each including:
     - Name.
     - Symbol.
     - Price.

4. Display:
   - Show the main stock list and the watchlist in separate sections.
   - Ensure the UI clearly indicates which stocks are already in the watchlist.

5. Interaction:
   - Include buttons to add stocks to or remove them from the watchlist.
   - Dynamically update the watchlist when changes are made.
*/

import React, { useState } from 'react';

const dummyStockData = [
    {
        name: 'Apple',
        symbol: 'APPL',
        price: 200
    },
    {
        name: 'Google',
        symbol: 'GOOG',
        price: 1200
    },
    {
        name: 'Tesla',
        symbol: 'TSLA',
        price: 250
    },
    {
        name: 'Salesforce',
        symbol: 'CRM',
        price: 320
    },
    {
        name: 'Amazon',
        symbol: 'AMZN',
        price: 185
    },
    {
        name: 'Cloudflare',
        symbol: 'CLDF',
        price: 500
    },
    {
        name: 'Opentext',
        symbol: 'OPTX',
        price: 40
    },
];

const stockCardStyles = {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px'
}

const StockCard = ({stock, isWatchlisted, watchListStockHandler}) => {
    return (
        <div className='stock-card' style={stockCardStyles} key={stock.symbol}>
            <div>{stock.name}</div>
            <div>{stock.symbol}</div>
            <div>{stock.price}</div>
            {!isWatchlisted && <button onClick={() => watchListStockHandler(stock.symbol, 'add')}>Add to watch list</button>}
        </div>
    );
}

const EMSix = () => {

    const [stockData, setStockData] = useState(dummyStockData);
    const [watchlist, setWatchlist] = useState([]);

    const watchListStockHandler = (id, type) => {
        switch(type){
            case 'add':
                setWatchlist((prev) => [...prev, id])
                break;
            case 'del':
                let newWatchlist = watchlist.filter((s) => s.symbol !== id )
                setWatchlist(newWatchlist);
                break;
            default:
                console.log('type not found');
        }
    }

    return(
        <div className='stocks-container'>
            <div className='live-stocks-container'>
                {stockData.map((stock) => 
                    <StockCard 
                        key={stock.symbol}
                        stock={stock}
                        isWatchlisted={watchlist.indexOf(stock.symbol) !== -1}
                        watchListStockHandler={watchListStockHandler}
                    />)}
            </div>
            <div className='watchlist-container'>
                
            </div>
        </div>
    )
}

export default EMSix;