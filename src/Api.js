import axios from 'axios';

const baseURL = 'http://localhost:8081'; // Update the port number accordingly

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendTransaction = async (data) => {
  try {
    const response = await api.post('/sendTransaction', data);
    return response.data;
  } catch (error) {
    throw error.response.data.error || 'Something went wrong';
  }
};
