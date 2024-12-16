import axios from "axios";

class ProductService {
    static BASE_URL = "http://localhost:8080";


    static async SaveProduct(productData) {
        try {
            const response = await axios.post(`${ProductService.BASE_URL}/auth/add-product`, productData)
            return response.data;

        } catch (error) {
            throw error;
        }
    }

    static async getAllProducts() {
        try {

            const response = await axios.get(`${ProductService.BASE_URL}/auth/get-all-product`)
            return response.data;

        } catch (error) {
            throw error;
        }
    }

    static async deleteProductById(productId) {
        try {

            const response = await axios.delete(`${ProductService.BASE_URL}/auth/delete-product/${productId}`)
            return response.data;

        } catch (error) {
            throw error;
        }
    }

    static async getProductById(productId) {
        try {

            const response = await axios.get(`${ProductService.BASE_URL}/auth/get-product/${productId}`)
            return response.data;

        } catch (error) {
            throw error;
        }
    }

    static async updateProduct(productId, ProductData) {
        try {
            const response = await axios.put(`${ProductService.BASE_URL}/auth/update-product/${productId}`, ProductData
            )
            return response.data;

        } catch (error) {
            throw error;
        }
    }

    static async getProductAllRatingReviews(requestData) {
        try {

            const response = await axios.post(`${ProductService.BASE_URL}/auth/get-product-ratingreview/`, requestData)
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}

export default ProductService;