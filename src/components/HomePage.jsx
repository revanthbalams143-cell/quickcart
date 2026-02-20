import React from 'react';
import ProductList from './ProductList';
import { useCart } from '../context/CartContext';

function HomePage({ products, searchTerm }) {
  const { addToCart } = useCart();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      {searchTerm && (
        <p>
          Showing {filteredProducts.length} result
          {filteredProducts.length !== 1 ? 's' : ''} for "{searchTerm}"
        </p>
      )}

      {filteredProducts.length > 0 && (
        <ProductList products={filteredProducts} onAddToCart={addToCart} />
      )}

      {filteredProducts.length === 0 && <p>No products found</p>}
    </div>
  );
}

export default HomePage;