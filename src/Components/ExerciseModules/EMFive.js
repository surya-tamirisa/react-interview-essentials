/*
Question: Create a React application to manage a shopping cart.

Requirements:
1. The application should:
   - Display a list of items in the cart with their name, price, and quantity.
   - Allow users to select or deselect items in the cart.
   - Enable users to update the quantity of each item.

2. Cart functionality:
   - Dynamically calculate the total cost of selected items.
   - Update the total when the quantity or selection of items changes.

3. Interaction:
   - Provide a checkbox for selecting or deselecting items.
   - Include buttons to increase or decrease the quantity of each item.
   - Allow users to manually edit the quantity in an input field.

4. Display:
   - Show the updated total cost in a separate section.
   - Ensure the layout is user-friendly and clearly displays the cart items and their details.
*/

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