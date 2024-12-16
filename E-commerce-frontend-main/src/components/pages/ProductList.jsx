import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductService from '../service/ProductService';
import '../../style/productlist.css';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const dummyProducts = await ProductService.getAllProducts();

        const productsWithReviews = await Promise.all(dummyProducts.products.map(async (product) => {
          const requestData = { product_id: product.product_id };
          let reviews = { ratingReviewDtoList: [] };

          try {
            reviews = await ProductService.getProductAllRatingReviews(requestData);
    
          } catch (err) {
            console.error(`Error fetching reviews for product ${product.product_id}:`, err);
          }

          const reviewList = reviews.ratingReviewDtoList || [];
          const reviewCount = reviewList.length;

          const averageRating = reviewCount > 0
            ? reviewList.reduce((sum, review) => sum + (review.rating_value || 0), 0) / reviewCount
            : 0;

          const roundedAverageRating = Math.round(averageRating * 10) / 10;

          return {
            ...product,
            reviews,
            averageRating: roundedAverageRating,
            reviewCount,
          };
        }));

        setProducts(productsWithReviews);
      } catch (error) {
        console.error("Error fetching products or reviews:", error);
      }
    };

    fetchProducts();
  }, []);

  const truncateDescription = (description) => {
    return description.length > 70 ? description.slice(0, 70) + '...' : description;
  };

  return (
    <div className="product-list-container">
      <h2 className="heading">Product List</h2>
      {products.length === 0 ? (
        <p style={{ color: 'red', fontSize: '18px', fontWeight: 'bold' }}>No products found</p>
      ) : (
        <div className="product-container">
          {products.map((product) => (
            <div className="product-card" key={product.product_id}>
              <img
                src={`data:image/jpeg;base64,${product.product_image}`}
                alt={product.product_name}
                className="product-image"
              />
              <h3 className="product-name">{product.product_name}</h3>
              <p className="product-description">{truncateDescription(product.product_description)}</p>
              <div className="product-rating">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={index < product.averageRating ? 'filled' : 'empty'}>
                    ★
                  </span>
                ))}
                {product.reviewCount !== undefined && (
                  <span className="review-count" style={{ color: '#878787', fontSize: '15px' }}>
                    ({product.reviewCount || 0})
                  </span>
                )}
              </div>
              <p className="product-price">${product.product_price}</p>
              <Link to={`/view-product/${product.product_id}`} className="view-button">View</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
