import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getProductById } from "../data/products";
import { useCart } from "../context/CartContext";
import { formatMoney } from "../utils/helpers";

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = getProductById(id);

        if (!fetchProduct) {
            navigate('/'); // Redirect to home if product not found
            return;
        }
        setProduct(fetchProduct);
    }, [id, navigate]);

    if (!product) {
        return <div>Loading...</div>;
    }
    return (
        <div className="page">
            <div className="container">
                <div className="product-detail">
                    <div className="product-detail-image">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-detail-content">
                        <h1 className="product-detail-name">{product.name}</h1>
                        <p className="product-detail-price"> {formatMoney(product.price, '&#8358;')}</p>
                        <p className="product-detail-description">{product.description}</p>
                        <button className="btn btn-primary" onClick={() => addToCart(product.id)}>add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}