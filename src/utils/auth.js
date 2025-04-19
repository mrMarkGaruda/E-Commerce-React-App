const API_URL = 'https://your-api-url.com/api'; // Replace with your actual API URL

// Login user
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Invalid credentials');
    }

    const data = await response.json();
    
    // Store token in localStorage
    localStorage.setItem('token', data.token);
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Check if user is logged in
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

// Get token
export const getToken = () => {
  return localStorage.getItem('token');
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem('token');
};