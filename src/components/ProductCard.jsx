import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatMoney } from "../utils/helpers";
export default function ProductCard({ product }) {
    const { addToCart, cartItems } = useCart();
    const productInCart = cartItems.find((item) => item.id === product.id);
    const productQuantityLabel = productInCart ? `(${productInCart.quantity})` : '';
    const formattedPrice = formatMoney(product.price, '&#8358;');
    return (
        <div className="product-card" >
            <img src={product.image} alt={product.name} className="product-card-image" />
            <div className="product-card-content">
                <h3 className="product-card-name">{product.name}</h3>
                <p className="product-card-price">{formattedPrice}</p>
                <div className="product-card-actions">
                    <Link className="btn btn-secondary" to={`/product/${product.id}`}>view details</Link>
                    <button className="btn btn-primary" onClick={() => addToCart(product.id)}>
                        add to cart {productQuantityLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}