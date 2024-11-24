import React, { useState, useEffect } from 'react';


const dummyCartData  = [
    {
        name: 'Apple',
        price: 10,
        quantity: 1
    },
    {
        name: 'Banana',
        price: 5,
        quantity: 1
    },
    {
        name: 'Orange',
        price: 7,
        quantity: 2
    },
    {
        name: 'Almonds',
        price: 25,
        quantity: 1
    },
]

const itemEntityBoxStyles = {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px'
}

const cartContainerStyles = {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px'
}

const CartItem = ({item, isSelected, handleItemChange}) => {
    // console.log('item received: ', item.name, isSelected)
    return (
        <div className='item-entity-box' style={itemEntityBoxStyles} id={item.name}>
            <input 
                type='checkbox' 
                checked={isSelected}
                onChange={(e) =>
                    handleItemChange(item.name, 'selection', e.target.checked)}
            ></input>
            <div>{item.name}</div>
            <div>{item.price}</div>
            <div>
                <button onClick={(e) =>
                        handleItemChange(item.name, 'quantity', item.quantity-1)}>-</button>
                <input 
                    value={item.quantity} 
                    onChange={(e) =>
                        handleItemChange(item.name, 'quantity', e.target.value)}></input>
                <button onClick={(e) =>
                        handleItemChange(item.name, 'quantity', item.quantity+1)}>+</button>
            </div>
        </div>
    );
}

const EMFive = () => {

    const [cardData , setCartData] = useState(dummyCartData);
    const [selectedIds, setSelectedIds] = useState(dummyCartData.map((i) => i.name));
    const [currentTotal, setCurrentTotal] = useState(0);

    useEffect(() => {
        let tot = 0;
        cardData.forEach((i) => {if(selectedIds.includes(i.name)) tot = tot + (i.quantity*i.price)});
        setCurrentTotal(tot);
    }, [selectedIds, cardData]);

    const handleItemChange = (itemName, type, value) => {
        switch(type){
            case 'quantity':
                let newCartData = cardData.map((i) => {
                    let item = {...i}
                    if(i.name === itemName)
                        item.quantity = Number(value);
                    return item;
                });
                console.log(newCartData);
                setCartData(newCartData);
            break;
            case 'selection':
                console.log(selectedIds, value)
                if(value) setSelectedIds((prev) => [...prev, itemName]);
                else setSelectedIds( selectedIds.filter(id => id !== itemName ))
            break;
        }
    };

    return (
        <div className="cart-container" style={cartContainerStyles}>
            {/* list View comes here */}
            <div>
                {cardData.map((item) => 
                    <CartItem 
                    item={item} 
                    handleItemChange={handleItemChange}
                    isSelected={selectedIds.indexOf(item.name) !== -1 } 
                    />)}
            </div>
            <div className='totalSection'>
                Your total is: {currentTotal}
            </div>
        </div>
    )
};

export default EMFive;