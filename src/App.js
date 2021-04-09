import React, { useState, useEffect } from "react";
import { Products, Navbar, Cart } from "./components";
import { commerce } from "./lib/commerce";
// import { Products, Navbar } from "./components";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const fetchProducts = async () => {
    try {
      const { data } = await commerce.products.list();

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCart = async () => {
    try {
      const carrito = await commerce.cart.retrieve();

      setCart(carrito);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = async (productId, quanitity) => {
    const item = await commerce.cart.add(productId, quanitity);
    setCart(item.cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  console.log(products);
  console.log(cart);
  return (
    <div>
      <Navbar totalItems={cart.total_items} />
      {/* <Products products={products} onAddToCart={handleAddToCart} />; */}
      <Cart cart={cart} />
    </div>
  );
}

export default App;
