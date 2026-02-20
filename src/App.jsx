import { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import { products } from './data/products';
import './styles/App.css';

function App() {
  // State for cart items (array of products with quantities)
  const [cart, setCart] = useState([]);
  
  // State for cart visibility (is cart sidebar open?)
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add product to cart
  const addToCart = (product) => {
    console.log('Adding to cart:', product);
    
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      // Product exists, increase quantity
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      // New product, add with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    console.log('Removing from cart:', productId);
    setCart(cart.filter(item => item.id !== productId));
  };

  // Update quantity of a product in cart
  const updateQuantity = (productId, newQuantity) => {
    console.log('Updating quantity:', productId, newQuantity);
    
    if (newQuantity <= 0) {
      // Remove item if quantity is 0 or less
      removeFromCart(productId);
    } else {
      // Update the quantity
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  // Toggle cart sidebar open/close
  const toggleCart = () => {
    console.log('Toggling cart');
    setIsCartOpen(!isCartOpen);
  };

  // Calculate total number of items in cart
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="app">
      <Header 
        cartItemCount={getTotalItems()} 
        onCartClick={toggleCart}
      />
      <main className="main-content">
        <ProductList 
          products={products} 
          onAddToCart={addToCart}
        />
      </main>
      
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={toggleCart}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />
    </div>
  );
}

export default App;
