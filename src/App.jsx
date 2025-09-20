import { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import './App.css';

import Navbar from './components/navbar/navbar';
import Section1 from './sections/s1';
import Section2 from './sections/s2';
import Section3 from './sections/s3';
import Section4 from './sections/s4';
import Footer from './components/Footer/footer';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import ZermattPage from './pages/ZermattPage';
import SWatchesPage from './pages/SWatchesPage';
import DiamondPage from './pages/DiamondPage';
import WhiteGoldPage from './pages/WhiteGoldPage';



function HomePage() {
  const hasScrolled = useRef(false);

  useEffect(() => {
    function onScroll() {
      if (!hasScrolled.current && window.scrollY > 10) {
        const section2 = document.getElementById("section2");
        const section3 = document.getElementById("section3");

        if (section2 && section3) {
          const top2 = section2.getBoundingClientRect().top + window.scrollY;
          const top3 = section3.getBoundingClientRect().top + window.scrollY;
          const middlePoint = top2 + (top3 - top2) / 2;

          window.scrollTo({ top: middlePoint, behavior: "smooth" });
          hasScrolled.current = true;
        }
      }
    }

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
     
    </>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
                <Route path="/products/Zermatt" element={<ZermattPage />} />
        <Route path="/products/s-watches" element={<SWatchesPage />} />
        <Route path="/products/diamond" element={<DiamondPage />} />
        <Route path="/products/white-gold" element={<WhiteGoldPage />} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;