import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductService from '../service/ProductService';
import '../../style/allproduct.css';

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await ProductService.getAllProducts();
      if (response && response.products) {
        setProducts(response.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products');
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this product?');
      if (confirmDelete) {
        await ProductService.deleteProductById(productId);
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="product-management-container">
      <h2>Product Management Page</h2>

      {error && <div className="error-message">{error}</div>}

      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) && products.length > 0 ? (
            products.map(item => (
              <tr key={item.product_id}>
                <td>{item.product_id}</td>
                <td>{item.product_name}</td>
                <td>{item.product_price}</td>
                <td>{item.product_description}</td>
                <td>
                  <div className="action-buttons">
                    <button className="delete-button" onClick={() => deleteProduct(item.product_id)}>
                      Delete
                    </button>
                    <button className="update-button">
                      <Link className="link-button" to={`/auth/update-product/${item.product_id}`}>
                        Update
                      </Link>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No products available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AllProducts;
