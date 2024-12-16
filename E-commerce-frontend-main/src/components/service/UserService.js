import axios from "axios";

class UserService {
    static BASE_URL = "http://localhost:8080";

    static async login(email, password) {
        try {

            const response = await axios.post(`${UserService.BASE_URL}/auth/login`, { email, password })
            return response.data;

        } catch (error) {
            throw error;
        }
    }


    static async register(userData) {
        try {
            const response = await axios.post(`${UserService.BASE_URL}/auth/register`, userData)
            return response.data;

        } catch (error) {
            throw error;
        }
    }
    

    static async getAllUsers(token) {
        try {

            const response = await axios.get(`${UserService.BASE_URL}/admin/get-all-users`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                })
            return response.data;

        } catch (error) {
            throw error;
        }
    }

    static async getYourProfile(token) {
        try {

            const response = await axios.get(`${UserService.BASE_URL}/adminuser/get-profile`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
            return response.data;

        } catch (error) {
            throw error;
        }
    }

    static async getUserById(userId, token) {
        try {

            const response = await axios.get(`${UserService.BASE_URL}/auth/get-users/${userId}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                })
            return response.data;
        } catch (error) {
            throw error;
        }
    }


    static async deleteUserById(userId, token) {
        try {

            const response = await axios.delete(`${UserService.BASE_URL}/admin/delete/${userId}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                })
            return response.data;

        } catch (error) {
            throw error;
        }
    }


    static async updateUser(userId, userData, token) {
        try {

            const response = await axios.put(`${UserService.BASE_URL}/auth/update/${userId}`, userData,
                {
                    headers: { Authorization: `Bearer ${token}` }
                })
            return response.data;

        } catch (error) {
            throw error;
        }
    }

    /*AUTHENTICATION CHECKER*/

    static logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('role')

    }

    static isAuthenticated() {
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin() {
        const role = localStorage.getItem('role')
        return role === "ADMIN"
    }

    static isUser() {
        const role = localStorage.getItem('role')
        return role === "USER"
    }

    static adminOnly() {
        return this.isAuthenticated() && this.isAdmin();

    }
}

export default UserService;