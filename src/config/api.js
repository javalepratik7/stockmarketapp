import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL configuration
// const BASE_URL = 'https://78hs53hb-5000.inc1.devtunnels.ms';
const BASE_URL = 'https://sm-7jf98liuo-javalepratik7s-projects.vercel.app';

// Create Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to attach token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error('Token retrieval error:', error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // Auto logout on unauthorized
      await logout();
    }
    return Promise.reject(error);
  }
);

// ---------- AUTH APIS ----------

export const signIn = async (data) => {
  try {
    const response = await api.post('/signin', data);
    // No token in response, just return the success data
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error('Signin Error:', errorMessage);
    throw new Error(errorMessage);
  }
};

// Login (get token)
export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    if (response.data?.token) {
      await AsyncStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error('Login Error:', errorMessage);
    throw new Error(errorMessage);
  }
};

// Logout (clear token)
export const logout = async () => {
  try {
    await AsyncStorage.removeItem('token');
    console.log('Logged out successfully');
  } catch (error) {
    console.error('Logout Error:', error);
    throw error;
  }
};

// ---------- FEATURE APIS ----------

// Analyze Investment
export const analyzeInvestment = async (investmentData) => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log("token", token);
    
    const response = await api.post('/analyze', investmentData ,{
      headers: {
        'Authorization': `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error('Analyze Error:', errorMessage);
    throw new Error(errorMessage);
  }
};

// Market Stats
// export const getMarketStats = async () => {
//   try {
//     const response = await api.get('/market-stats');
//     return response.data;
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message;
//     console.error('Market Stats Error:', errorMessage);
//     throw new Error(errorMessage);
//   }
// };


export const getMarketStats = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log("token",token)
    
    const response = await api.get('/market-stats', {
      headers: {
        'Authorization':`${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error('Market Stats Error:', errorMessage);
    throw new Error(errorMessage);
  }
};

// ---------- TOKEN UTILS ----------

// Get token from AsyncStorage
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (error) {
    console.error('Get Token Error:', error);
    return null;
  }
};

// Check if user is logged in
export const isLoggedIn = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return !!token;
  } catch (error) {
    console.error('isLoggedIn Error:', error);
    return false;
  }
};

export default api;