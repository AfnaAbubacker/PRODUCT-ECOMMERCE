import axios from "axios";

class RatingReviewService {

    static BASE_URL = "http://localhost:8080";



    static async SaveRatingReview(userData) {
        try {
            const response = await axios.post(`${RatingReviewService.BASE_URL}/auth/ReviewRating-add`, userData)
            return response.data;

        } catch (error) {
            throw error;
        }
    }


    static async getExistRatingReviewByUserId(requestData) {
        try {
        
            const response = await axios.post(`${RatingReviewService.BASE_URL}/auth/ReviewRating-existing/`, requestData)
            return response.data;
         
        } catch (error) {
            throw error;
        }
    }

    static async updateReviewRatingDetails(reviewId, reviewData) {
        try {
            const response = await axios.put(`${RatingReviewService.BASE_URL}/auth/update-ReviewRating/${reviewId}`, reviewData)
            return response.data;

        } catch (error) {
            throw error;
        }
    }


    static async deleteReviewRatingById(reviewId) {
        try {
            const response = await axios.delete(`${RatingReviewService.BASE_URL}/auth/delete-ReviewRating/${reviewId}`)
            return response.data;

        } catch (error) {
            throw error;
        }
    }

    static async getAllReviewRatings() {
        try {

            const response = await axios.get(`${RatingReviewService.BASE_URL}/auth/get-all-ReviewRating`)
            return response.data;

        } catch (error) {
            throw error;
        }
    }

}

export default RatingReviewService;