import React, { useState, useEffect } from 'react';
import UserService from '../service/UserService';
import { Link, useNavigate } from 'react-router-dom';
import '../../style/profilepage.css';

function ProfilePage() {
    const [profileInfo, setProfileInfo] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await UserService.getYourProfile(token);
            setProfileInfo(response.ourUsers);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    return (
        <div className="profile-page-container">
            <h2>Profile Information</h2>
            <p>Name: {profileInfo.name}</p>
            <p>Email: {profileInfo.email}</p>
            <p>City: {profileInfo.city}</p>
            <button><Link to={`/update-user/${profileInfo.id}`}>Update This Profile</Link></button>

        </div>
    );
}

export default ProfilePage;



