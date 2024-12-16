import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import RatingReviewService from '../service/RatingReviewService';
import ProductService from '../service/ProductService';
import '../../style/viewproduct.css';

function ViewProduct() {
  const { prodId } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const [prodData, setProdData] = useState({
    product_name: '',
    product_price: '',
    product_description: '',
    product_image: null,
  });

  const [reviews, setReviews] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);

  const [formData, setFormData] = useState({
    rating_value: 0,
    review_description: '',
    product_id: prodId,
    user_id: userId,
  });

  useEffect(() => {
    fetchProductDataById(prodId);
    checkIfReviewExists(prodId, userId);
    fetchAllReviews(prodId);
  }, [prodId]);

  const fetchProductDataById = async (prodId) => {
    try {
      const response = await ProductService.getProductById(prodId);
      const { product_name, product_price, product_description, product_image } = response.singleProduct;
      setProdData({ product_name, product_price, product_description, product_image });
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const checkIfReviewExists = async (prodId, userId) => {
    try {
      const requestData = { product_id: prodId, user_id: userId };
      const reviewResponse = await RatingReviewService.getExistRatingReviewByUserId(requestData);

      const reviewsList = reviewResponse.ratingReviewDtoList || [];

      setReviews(reviewsList);
    } catch (error) {
      console.error('Error checking review:', error);
      setReviews([]);
    }
  };

  const fetchAllReviews = async () => {
    try {
      const reviewResponseAll = await RatingReviewService.getAllReviewRatings();
      
      const allReviewsList = reviewResponseAll.ratingReviewList || [];
      const filteredReviews = allReviewsList.filter((review) => review.product.product_id == prodId && review.user.id != userId);
      
      setAllReviews(filteredReviews);
    } catch (error) {
      console.error('Error fetching all reviews:', error);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStarClick = (index) => {
    setFormData({ ...formData, rating_value: index + 1 });
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isEditing) {
      const existingReview = reviews.find((review) => review.user_id == userId);
      if (existingReview) {
        alert('You have already submitted a review for this product.');
        setFormData({ rating_value: 0, review_description: '' });
        return;
      }
    }

    try {
      if (isEditing) {
        await RatingReviewService.updateReviewRatingDetails(editingReviewId, formData);
        alert('Review updated successfully');
        setIsEditing(false);
        setEditingReviewId(null);
      } else {
        await RatingReviewService.SaveRatingReview(formData);
        alert('Review submitted successfully');
      }

      setFormData({ rating_value: 0, review_description: '' });
      checkIfReviewExists(prodId, userId);
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('An error occurred while submitting the review');
    }
  };

  const handleEditClick = (review) => {
    setIsEditing(true);
    setEditingReviewId(review.rating_review_id);
    setFormData({
      rating_value: review.rating_value,
      review_description: review.review_description,
      product_id: review.product_id,
      user_id: review.user_id,
    });
  };

  const handleDeleteClick = async (reviewId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this review?');
    if (confirmDelete) {
      try {
        await RatingReviewService.deleteReviewRatingById(reviewId);
        alert('Review deleted successfully');
        navigate(0);
        checkIfReviewExists(prodId, userId);
      } catch (error) {
        console.error('Error deleting review:', error);
        alert('An error occurred while deleting the review');
      }
    } else {
      return;
    }
  };

  return (
    <div className="view-product-container">
      <div className="product-content">
        <div className="left-container">
          <img
            src={`data:image/jpeg;base64,${prodData.product_image}`}
            alt={prodData.product_name}
            className="product-image-view"
          />
        </div>
        <div className="right-container">
          <h2 className="product-name">{prodData.product_name}</h2>
          <p className="product-price">${prodData.product_price}</p>
          <p className="product-description">{prodData.product_description}</p>

          <div className="add-review">
            <h3>{isEditing ? 'Edit Your Review' : 'Write Your Review'}</h3>
            <div className="star-rating">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={index < formData.rating_value ? 'filled' : 'empty'}
                  onClick={() => handleStarClick(index)}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              className="review-textbox"
              name="review_description"
              placeholder="Write your review here..."
              value={formData.review_description}
              onChange={handleInputChange}
              required
            ></textarea>
            <button onClick={handleSubmitReview} className="submit-review-button">
              {isEditing ? 'Update Review' : 'Submit Review'}
            </button>
            <br />
            <Link to="/product-list" className="back-link">
              Back to Product List
            </Link>
          </div>
        </div>
      </div>

      {reviews.length > 0 && (
        <div className="existing-reviews">
          <h3>Customer Reviews</h3>
          <div className="reviews-container">
            {reviews.map((review) => (
              <div key={review.rating_review_id} className="review-card">
                <p style={{ textTransform: 'uppercase' }}>
                  {review.user_name} {review.user_id == userId ? <span style={{ textTransform: 'none' }}> (you)</span> : ''}
                </p>

                <div className="review-header">
                  <div className="review-rating">
                    {[...Array(review.rating_value)].map((_, index) => (
                      <span key={index} className="filled">★</span>
                    ))}
                  </div>
                  <div className="buttons">
                    <button className="edit-button" onClick={() => handleEditClick(review)}>
                      Edit
                    </button>
                    <button className="delete-button" onClick={() => handleDeleteClick(review.rating_review_id)}>
                      Delete
                    </button>
                  </div>
                </div>

                <p className="review-description">{review.review_description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {allReviews.length > 0 && (
        <div className="other-reviews">
          <div className="reviews-container">
            {allReviews.map((review) => (
              <div key={review.rating_review_id} className="review-card">
                <p style={{ textTransform: 'uppercase' }}>
                  {review.user.name}
                </p>

                <div className="review-header">
                  <div className="review-rating">
                    {[...Array(review.rating_value)].map((_, index) => (
                      <span key={index} className="filled">★</span>
                    ))}
                  </div>
                </div>

                <p className="review-description">{review.review_description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewProduct;

