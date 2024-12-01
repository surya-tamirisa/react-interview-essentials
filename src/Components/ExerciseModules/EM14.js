/*
Question: Create a React component to manage a simple shopping cart system.

Requirements:
1. The component should display:
   - A list of products with their details (ID, name, and price).
   - A cart that shows the products added by the user.

2. Provide functionality to:
   - Add products to the cart from the product list.
   - Disable the "Add to Cart" button for products already added to the cart.
   - Toggle the visibility of the cart with an "Open Cart" and "Close Cart" button.

3. Ensure the cart displays all the products added, along with their details.
*/

import { createContext, useContext, useState } from "react";


const CartContext = createContext();

const productsList = [
    { id: 1, name: "Product A", price: 30 },
    { id: 2, name: "Product B", price: 20 },
    { id: 3, name: "Product C", price: 50 },
    { id: 4, name: "Product D", price: 10 },
    { id: 5, name: "Product E", price: 100 },
];


const EM14 = () => {
    const [products, setProducts] = useState(productsList);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(0);
    return (
        <CartContext.Provider value={{products, cart, setCart}}>
            <div>
                <ProductsList />
                <br></br>
                <br></br>
                <br></br>
                <button onClick={() => setIsCartOpen(!isCartOpen)}>{isCartOpen ? 'Close Cart' : 'Open Cart'}</button>
                {!!isCartOpen && <DisplayCart />}
            </div>
        </CartContext.Provider>
    );
}

const ProductsList = () => {
    const {products, setCart, cart} = useContext(CartContext);
    return(
        <div>
            {products.map(p => {
                let isPresent = cart.find(pr => pr.id === p.id)
                return (
                    <div style={{ display: 'flex', flexDirection:'row', gap: '20px'}}>
                        <div>{p.id}</div>
                        <div>{p.name}</div>
                        <div>{p.price}</div>
                        <button
                            disabled={isPresent}
                            onClick={() => setCart([...cart, p])}> Add To Cart</button>
                    </div>
                );
            })}
        </div>
    );
}

const DisplayCart = () => {
    const {cart} = useContext(CartContext);
    return (
        cart.map(p => {
                return (
                    <div style={{ display: 'flex', flexDirection:'row', gap: '20px'}}>
                        <div>{p.id}</div>
                        <div>{p.name}</div>
                        <div>{p.price}</div>
                    </div>
                )
            })
    );
}

export default EM14;