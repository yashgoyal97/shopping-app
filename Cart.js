import { useEffect, useState } from "react";

const Cart = (props) => {

    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        if (!cartProducts.length) {
            getCartData();
        }
    }, [cartProducts]);

    const getCartData = () => {
        fetch('http://localhost:8080/cart')
            .then(res => res.json())
            .then((data) => {
                setCartProducts(data);
            });
    }

    const handleRemoveFromCart = (product) => {
        const elemIndex = cartProducts.indexOf(product);
        const cart = cartProducts;
        cart.splice(elemIndex, 1);
        fetch(`http://localhost:8080/cart/${product.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(() => getCartData());
    };

    const Products = (props) => {
        const products = props.products;
        const productsList = products.map((product) => {
            return (
                <div key={product._id}>
                    <h3>Title: {product.title}</h3>
                    <p>Description: {product.description}</p>
                    <p>Price: {product.price}</p>
                    <button onClick={() => handleRemoveFromCart(product)}>Delete</button>
                </div>
            );
        });
        return productsList;
    }

    return (
        <div>
            <h1>Cart</h1>
            {cartProducts && <Products products={cartProducts}></Products>}
        </div>
    )
}

export default Cart;