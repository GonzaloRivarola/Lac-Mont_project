import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useCart } from "../context/CartContext";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainMedia, setMainMedia] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [recommended, setRecommended] = useState([]);

  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const docRef = doc(db, "Products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        let mediaArray = [];
        if (data.images) {
          if (Array.isArray(data.images)) {
            mediaArray = data.images;
          } else {
            try {
              mediaArray = JSON.parse(data.images);
              if (!Array.isArray(mediaArray)) mediaArray = [];
            } catch {
              mediaArray = [];
            }
          }
        }

        setProduct({ ...data, images: mediaArray });
        setMainMedia(mediaArray.length > 0 ? mediaArray[0] : data.imageUrl || null);
      } else {
        setProduct(null);
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  useEffect(() => {
    async function fetchRecommended() {
      if (!product) return;

      const q = query(
        collection(db, "Products"),
        where("collection", "==", "Zermatt")
      );

      const querySnapshot = await getDocs(q);
      const productsArray = [];
      querySnapshot.forEach((doc) => {
        if (doc.id !== id) {
          productsArray.push({ id: doc.id, ...doc.data() });
        }
      });

      setRecommended(productsArray.slice(0, 3));
    }

    fetchRecommended();
  }, [product, id]);

  if (loading) return <p className="loading">Loading product...</p>;
  if (!product) return <p className="not-found">Product not found.</p>;

  const isInCart = cart.some(item => item.id === id);

  const handleToggleCart = () => {
    if (isInCart) {
      removeFromCart(id);
    } else {
      addToCart({ id, ...product });
    }
  };

  const isVideo = (url) => url?.endsWith(".mp4") || url?.endsWith(".webm");

  return (
    <>
      <div className="product-detail-container">
        <div className="product-images">
          {/* Main media */}
          <div className="main-media-wrapper">
            {isVideo(mainMedia) ? (
              <video
                src={mainMedia}
                autoPlay
                loop
                muted
                playsInline
                className="main-media-video"
              />
            ) : (
              <img
                src={mainMedia || "https://via.placeholder.com/400x400?text=No+Image"}
                alt={product.name}
                className="main-media-img"
              />
            )}
          </div>

          {/* Thumbnails */}
          <div className="thumbnail-container">
            {product.images && product.images.length > 0 ? (
              product.images.map((mediaUrl, index) => (
                <div
                  key={index}
                  className={`thumbnail-wrapper ${mainMedia === mediaUrl ? "selected" : ""}`}
                  onClick={() => setMainMedia(mediaUrl)}
                >
                  {isVideo(mediaUrl) ? (
                    <video src={mediaUrl} className="thumbnail-video" muted />
                  ) : (
                    <img
                      src={mediaUrl}
                      alt={`${product.name} ${index + 1}`}
                      className="thumbnail-img"
                    />
                  )}
                </div>
              ))
            ) : (
              <p>No additional media</p>
            )}
          </div>
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">${product.price?.toFixed(2)}</p>
          <p className="description">{product.description}</p>
          <p className={`stock ${product.stock > 0 ? "in-stock" : "out-stock"}`}>
            {product.stock > 0 ? `Stock: ${product.stock}` : "Out of stock"}
          </p>
          <button
            disabled={product.stock === 0}
            className="btn-buy"
            onClick={handleToggleCart}
          >
            {isInCart ? "Remove from cart" : "Add to cart"}
          </button>
        </div>
      </div>

      {/* Recommended products */}
      {recommended.length > 0 && (
        <section className="recommended-section">
          <h2>Recommended Products</h2>
          <div className="recommended-list">
            {recommended.map((recProduct) => (
              <div key={recProduct.id} className="recommended-item">
                <img
                  src={
                    recProduct.images && recProduct.images.length > 0
                      ? recProduct.images[0]
                      : recProduct.imageUrl || "https://via.placeholder.com/150"
                  }
                  alt={recProduct.name}
                />
                <h3>{recProduct.name}</h3>
                <p>${recProduct.price?.toFixed(2)}</p>
                <Link to={`/product/${recProduct.id}`} className="btn-details">
                  View details
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Watch stats */}
      <section className="stats-section">
        <h2>Key Features</h2>
        <div className="stats-list">
          <div className="stat-item">
            <h3>50m Water Resistant</h3>
            <p>Perfect for swimming and outdoor activities.</p>
          </div>
          <div className="stat-item">
            <h3>2-Year Battery Life</h3>
            <p>No need to change the battery often.</p>
          </div>
          <div className="stat-item">
            <h3>1-Year Warranty</h3>
            <p>Covers any manufacturing defects.</p>
          </div>
          <div className="stat-item">
            <h3>Stainless Steel Body</h3>
            <p>Durable and elegant for everyday use.</p>
          </div>
        </div>
      </section>

      {/* User feedback */}
      <section className="feedback-section">
        <h2>User Reviews</h2>
        <div className="feedback-list">
          <div className="feedback-item">
            <p>"I love this watch! Very comfortable and durable."</p>
            <span>- John P.</span>
          </div>
          <div className="feedback-item">
            <p>"Excellent quality and stylish design."</p>
            <span>- Anna G.</span>
          </div>
          <div className="feedback-item">
            <p>"I wear it daily; battery lasts forever!"</p>
            <span>- Carlos M.</span>
          </div>
        </div>
      </section>


    </>
  );
};

export default ProductDetail;
