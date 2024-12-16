import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProductService from '../service/ProductService';
import '../../style/productadd.css';

function UpdateProduct() {
    const navigate = useNavigate();
    const { prodId } = useParams();

    const [formData, setFormData] = useState({
        product_name: '',
        product_price: '',
        product_description: '',
        product_image: null
    });

    useEffect(() => {
        fetchProductDataById(prodId);
    }, [prodId]);


    const fetchProductDataById = async (prodId) => {
        try {
            const response = await ProductService.getProductById(prodId);
            const { product_name, product_price, product_description } = response.singleProduct;
            setFormData({
                product_name,
                product_price,
                product_description,
                product_image: null
            });
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, product_image: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const confirmUpdate = window.confirm('Are you sure you want to update this product?');
            if (confirmUpdate) {


                const formDataToSubmit = new FormData();
                formDataToSubmit.append('product', JSON.stringify({
                    product_id: prodId,
                    product_name: formData.product_name,
                    product_price: formData.product_price,
                    product_description: formData.product_description
                }));

                if (formData.product_image) {
                    formDataToSubmit.append('image', formData.product_image);
                }

                await ProductService.updateProduct(prodId, formDataToSubmit);
                alert('Product updated successfully!');
                navigate('/auth/all-products');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            alert('An error occurred while updating the product');
        }
    };

    return (
        <div className="product-add-container">
            <div className="product-form-container">
                <h2 className="form-title">Update Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="product_name">Product Name</label>
                        <input
                            type="text"
                            id="product_name"
                            name="product_name"
                            value={formData.product_name}
                            onChange={handleInputChange}
                            placeholder="Enter product name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="product_price">Product Price</label>
                        <input
                            type="text"
                            id="product_price"
                            name="product_price"
                            value={formData.product_price}
                            onChange={handleInputChange}
                            placeholder="Enter product price"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="product_description">Product Description</label>
                        <textarea
                            id="product_description"
                            name="product_description"
                            value={formData.product_description}
                            onChange={handleInputChange}
                            placeholder="Enter product description"
                            rows="4"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="product_image">Product Image (optional)</label>
                        <input
                            type="file"
                            id="product_image"
                            name="product_image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>

                    <button type="submit" className="submit-btn">Update Product</button>
                </form>

                <Link to="/product-list" className="view-products-link">View All Products</Link>
            </div>
        </div>
    );
}

export default UpdateProduct;
