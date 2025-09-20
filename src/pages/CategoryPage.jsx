import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import ProductCard from "../components/ProductCard/ProductCard";
import "./Categories.css";

const CategoryPage = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, "Products"),
          where("collection", "==", category)
        );
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [category]);

  const filtered = products.filter(product => {
    const price = product.price || 0;
    if (minPrice && price < Number(minPrice)) return false;
    if (maxPrice && price > Number(maxPrice)) return false;
    return true;
  });

  return (
    <div className="page-container">
      <nav className="navbar">
        <h1>{category} Collection</h1>
      </nav>

      <div className="content">
        <aside className="filters-sidebar">
          <h3>Filter by Price</h3>
          <label>
            Minimum
            <input
              type="number"
              min="0"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              placeholder="0"
            />
          </label>
          <label>
            Maximum
            <input
              type="number"
              min="0"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              placeholder="9999"
            />
          </label>
        </aside>

        <main>
          {filtered.length === 0 ? (
            <p className="no-products">No products available.</p>
          ) : (
            <div className="products-grid">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;
