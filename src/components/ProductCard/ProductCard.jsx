import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="description">{product.description}</p>
        <p className="price">${product.price.toFixed(2)}</p>
        {product.stock !== undefined && (
          <p className={`stock ${product.stock > 0 ? "in-stock" : "out-stock"}`}>
            {product.stock > 0 ? `Limited Stock: ${product.stock}` : "Out of stock"}
          </p>
        )}
        <button
          className="btn-add"
          onClick={() => navigate(`/product/${product.id}`)}
          disabled={product.stock === 0}
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
