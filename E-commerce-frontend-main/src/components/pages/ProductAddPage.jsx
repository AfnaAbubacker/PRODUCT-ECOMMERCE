import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ProductService from '../service/ProductService';
import '../../style/productadd.css';
function ProductAddPage() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        product_name: '',
        product_price: '',
        product_description: '',
        product_image: null
    });

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
            const formDataToSubmit = new FormData();
            formDataToSubmit.append('product', JSON.stringify({
                product_name: formData.product_name,
                product_price: formData.product_price,
                product_description: formData.product_description
            }));

            if (formData.product_image) {
                formDataToSubmit.append('image', formData.product_image);
            }
        
            await ProductService.SaveProduct(formDataToSubmit);

            alert('Product saved successfully');
            navigate('/product-list');
            navigate(0);

        } catch (error) {
            console.error('Error registering product:', error);
            alert('An error occurred while saving the product');
        }
    };

    return (
        <div className="product-add-container">
            <div className="product-form-container">
                <h2 className="form-title">Add New Product</h2>
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
                        <label htmlFor="product_image">Product Image</label>
                        <input
                            type="file"
                            id="product_image"
                            name="product_image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>

                    <button type="submit" className="submit-btn">Save Product</button>
                </form>

                <Link to="/product-list" className="view-products-link">View All Products</Link>
            </div>
        </div>
    );
}

export default ProductAddPage;

