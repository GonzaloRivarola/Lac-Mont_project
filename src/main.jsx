
import { createRoot } from 'react-dom/client'
import { CartProvider } from "./context/CartContext";
import React from "react";
import { BrowserRouter } from "react-router-dom";


import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  
<React.StrictMode>
  <CartProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CartProvider>
</React.StrictMode>

  ,
)
