import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUserProfile();
        } else {
            delete axios.defaults.headers.common['Authorization'];
            setUser(null);
            setLoadingAuth(false);
        }
    }, [token]);

    const fetchUserProfile = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/auth/profile');
            setUser(res.data);
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            logout();
        } finally {
            setLoadingAuth(false);
        }
    };

    const login = async (email, password) => {
        const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
    };

    const register = async (userData) => {
        const res = await axios.post('http://localhost:5000/api/auth/register', userData);
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, loadingAuth, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
