import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';

function Navbar() {
    const [activeLink, setActiveLink] = useState('');
    const isAuthenticated = UserService.isAuthenticated();
    const isAdmin = UserService.isAdmin();
    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            UserService.logout();
            navigate('/');
        } else {
            navigate(0);
        }
    };

    const handleLinkClick = (text) => {
        setActiveLink(text);
    };

    return (
        <>
            <nav className='navbar-common'>
                <ul className='navbar-ul'>
                    {/* E-Commerce Website link (No active class applied) */}
                    {!isAuthenticated && (
                        <li className='navbar-head'>
                            E-Commerce Website
                        </li>
                    )}

                    {/* User's Product List */}
                    {isAuthenticated && (
                        <li className='navbar-li'>
                            <NavLink
                                to="/product-list"
                                className={activeLink === 'Products List' ? 'active' : ''}
                                onClick={() => handleLinkClick('Products List')}
                            >
                                Product List
                            </NavLink>
                        </li>
                    )}

                    {/* Admin Product Section */}
                    {isAdmin && isAuthenticated && (
                        <li className='navbar-li'>
                            <NavLink
                                to="/auth/product-add"
                                className={activeLink === 'Add Product' ? 'active' : ''}
                                onClick={() => handleLinkClick('Add Product')}
                            >
                                Add products
                            </NavLink>
                        </li>
                    )}

                    {/* Product List */}
                    {isAuthenticated && isAdmin && (
                        <li className='navbar-li'>
                            <NavLink
                                to="/auth/all-products"
                                className={activeLink === 'Product Management' ? 'active' : ''}
                                onClick={() => handleLinkClick('Product Management')}
                            >
                                Product Management
                            </NavLink>
                        </li>
                    )}


                    {/* Admin User Management */}
                    {isAdmin && isAuthenticated &&(
                        <li className='navbar-li'>
                            <NavLink
                                to="/admin/user-management"
                                className={activeLink === 'User Management' ? 'active' : ''}
                                onClick={() => handleLinkClick('User Management')}
                            >
                                User Management
                            </NavLink>
                        </li>
                    )}

                    {/* Profile link */}
                    {isAuthenticated && (
                        <li className='navbar-li'>
                            <NavLink
                                to="/profile"
                                className={activeLink === 'Profile' ? 'active' : ''}
                                onClick={() => handleLinkClick('Profile')}
                            >
                                Profile
                            </NavLink>
                        </li>
                    )}

                    {/* Logout */}
                    {isAuthenticated && (
                        <li className='navbar-li'>
                            <NavLink to="/" onClick={handleLogout}>
                                Logout
                            </NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </>
    );
}

export default Navbar;