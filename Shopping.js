import { useEffect, useState } from "react";

const Shopping = (props) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!products.length) {
            fetch('http://localhost:8080/products')
                .then(res => res.json())
                .then((data) => {
                    setProducts(data);
                });
        }
    }, [products]);

    const handleAddToCart = (product) => {
        const reqPayload = JSON.stringify(product);
        console.log(reqPayload);
        fetch('http://localhost:8080/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: reqPayload
        }).then(res => res.json())
            .then(data => console.log(data));
    };

    const Products = (props) => {
        const products = props.products;
        const productsList = products.map((product) => {
            return (
                <div key={product._id}>
                    <h3>Title: {product.title}</h3>
                    <p>Description: {product.description}</p>
                    <p>Price: {product.price}</p>
                    <button onClick={() => handleAddToCart(product)}>ADD TO CART</button>
                </div>
            );
        });
        return productsList;
    }

    return (
        <div>
            <h1>Shopping</h1>
            {products.length && <Products products={products}></Products>}
        </div>
    )
}

export default Shopping;