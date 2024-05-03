import axios from 'axios';


const baseURL = 'http://localhost:5000'; // Update the port number accordingly

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});


const sendTransactionToQueue = async (transactionData) => {
    try {
      // Send transaction data to backend
      const backendResponse = await api.post('/api/transactions', {
        ...transactionData,
        timestamp: new Date().toISOString(),
        transaction_status: false
      });
      if (backendResponse.status === 201) {
        console.log('Transaction data saved to backend');
      } else {
        console.error('Failed to save transaction data to backend');
      }
    } catch (error) {
      console.error('Error saving transaction data to backend:', error);
    }
  };
  

export { sendTransactionToQueue };
