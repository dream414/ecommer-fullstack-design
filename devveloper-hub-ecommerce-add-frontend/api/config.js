// Backend URL configuration
export const API_BASE_URL = 'http://localhost:5000/api';

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH_REGISTER: '/auth/register',
  AUTH_LOGIN: '/auth/login',
  
  // Products
  GET_PRODUCTS: '/products',
  GET_PRODUCT_BY_ID: '/products/:id',
  CREATE_PRODUCT: '/products',
  UPDATE_PRODUCT: '/products/:id',
  DELETE_PRODUCT: '/products/:id',
  
  // Orders
  CREATE_ORDER: '/orders',
  GET_USER_ORDERS: '/orders/user/:userId',
  GET_ORDER_BY_ID: '/orders/:id',
  UPDATE_ORDER: '/orders/:id',
};

// Helper function for API calls
export const apiCall = async (endpoint, method = 'GET', data = null) => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // JWT token
      },
    };
    
    if (data) options.body = JSON.stringify(data);
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Call Error:', error);
    throw error;
  }
};