// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/common/Navbar';
import LoginPage from './components/auth/LoginPage';
import RegistrationPage from './components/auth/RegistrationPage';
import FooterComponent from './components/common/Footer';
import UserService from './components/service/UserService';
import UserManagementPage from './components/userspage/UserManagementPage';
import ProfilePage from './components/userspage/ProfilePage';
import UpdateUser from './components/userspage/UpdateUser';
import ProductAddPage from './components/pages/ProductAddPage';
import ProductList from './components/pages/ProductList';
import ViewProduct from './components/pages/ViewProduct';
import AllProducts from './components/pages/AllProducts';
import UpdateProduct from './components/pages/UpdateProduct';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/view-product/:prodId" element={<ViewProduct />} />
            <Route path="/auth/update-product/:prodId" element={<UpdateProduct />} />
            <Route path="/auth/ReviewRating-add" element={<ViewProduct />} />
            <Route path="/update-user/:userId" element={<UpdateUser />} />

            {UserService.adminOnly() && (
              <>
                <Route path="/auth/product-add" element={<ProductAddPage />} />
                <Route path="/admin/user-management" element={<UserManagementPage />} />
                <Route path="/auth/all-products" element={<AllProducts />} />
              </>
            )}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>

      </div>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;