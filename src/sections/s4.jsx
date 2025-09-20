import React from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard/ProductCard";
import { Link } from "react-router-dom";

const Section4 = () => {
  const { products, loading, error } = useProducts("Zermatt");

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="section4">
      
    <section className="exclusive-call-to-action">
      <div className="container">
        <h2>Own the Moment</h2>
        <p>
          Discover the difference — our exclusive timepieces aren't just watches,
          they're statements. Handcrafted for those who demand more than ordinary.
          Limited stock. Timeless style. <strong>Shop now and own the moment.</strong>
        </p>
        <Link to="/products/Zermatt" className="btn-shop-now">
          Shop Now
        </Link>
      </div>
    </section>



      <div className="product-list">
        {products.length === 0 && <p>No products available.</p>}
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Section4;
