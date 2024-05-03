import React, { useState } from 'react';
import { sendTransaction } from '../Api.js';
import {sendTransactionToQueue} from '../TransactionQueue.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container, Form, Button, Col, Row } from 'react-bootstrap';

function HomePage() {
  const [privateKey, setPrivateKey] = useState('');
  const [receiverAddress, setReceiverAddress] = useState('');
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState(0.0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const floAmount = parseFloat(amount);
    const floMessage = "#FloConnect " + message;
    console.log(floMessage)
    // Prepare data to send
    const data = {
    //   senderAddress: senderAddress,
        privKey: privateKey,
        receiver: receiverAddress,
        floAmount:floAmount,
        floData: floMessage,
        fee:0.001
    };
    console.log(data);
    try {
        const response = await sendTransaction(data);
        console.log(response); // Log response from server
        // Display success message
        if (response && response.txid) {
            // Display success message along with transaction ID
            toast.success(`Transaction successful! Transaction ID: ${response.txid}`);
          } else {
            // Display success message without transaction ID
            sendTransactionToQueue(data);
            toast.success('Transaction added to queue');
          }
      } catch (error) {
        //console.error('Error sending transaction:', error);
        // Handle error if needed
        // Display error message
        toast.error(error);
      }
  
   // Reset form fields
   setPrivateKey('');
   setReceiverAddress('');
   setMessage('');
   setAmount('');
  };

  return (
    <>
   <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
    />
    <Container className=" mt-4">
        <Row className="justify-content-md-center">
            <Col lg={7} className='card'>   
                <h2 style={{ marginBottom: 20, color:'white' }}>Send FLO</h2>        
                <Form onSubmit={handleSubmit}>
                {/* <Form.Group className="mb-3" controlId="senderAddress">
                    <Form.Label style={{ color:'white' }}>Sender's Address</Form.Label>
                        <Form.Control
                            type="text"
                            value={senderAddress}
                            onChange={(e) => setSenderAddress(e.target.value)}
                            required
                        />
                </Form.Group> */}
                    <Form.Group className="mb-3" controlId="privateKey">
                        <Form.Label style={{ color:'white' }}>Private Key:</Form.Label>
                            <Form.Control
                                type="password"
                                value={privateKey}
                                onChange={(e) => setPrivateKey(e.target.value)}
                                required
                            />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="receiverAddress">
                        <Form.Label style={{ color:'white' }}>Receiver's Address:</Form.Label>
                        <Form.Control
                            type="text"
                            value={receiverAddress}
                            onChange={(e) => setReceiverAddress(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label style={{ color:'white' }}>Amount:</Form.Label>
                        <Form.Control
                            type="text"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="message">
                        <Form.Label style={{ color:'white' }}>Message:</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="secondary" size="lg" type="submit">Send</Button>
                </Form>
            </Col>
        </Row>
    </Container>
    </>
  );
}

export default HomePage;
