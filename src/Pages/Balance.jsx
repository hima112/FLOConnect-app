import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-bootstrap/Spinner';

const Balance = () => {
    const [address, setAddress] = useState('');
    const [usableBalance, setUsableBalance] = useState('');
    const [totalBalance, setTotalBalance] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCheckBalance = async () => {
        if (address) {
            setLoading(true); // Set loading to true while fetching data
            try {
                const response = await axios.get(`http://localhost:8081/getusablebalance/${address}`);
                const { usable_balance, total_balance } = response.data;
                setUsableBalance(usable_balance);
                setTotalBalance(total_balance);
            } catch (error) {
                toast.error('Error checking balance: ' + error.message);
            } finally {
                setLoading(false); // Reset loading to false after fetching data
            }
        } else {
            toast.error("Please enter the address!");
        }
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
            <Container className="mt-5 ">
                <Row className="justify-content-md-center text-center">
                    <Col lg={6} className='card'>
                        <h2 style={{ color: 'white' }}>Check Balance</h2>
                        <Form>
                            <Form.Group className="mb-3" controlId="address">
                                <Form.Label>Address:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Enter address"
                                />
                            </Form.Group>
                            <Button variant="secondary" size="lg" onClick={handleCheckBalance}>Check Balance</Button>
                        </Form>
                        {loading && (
                            <div className="mt-3 text-center">
                                <Spinner animation="border" role="status" variant="light">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        )}
                        {!loading && usableBalance && totalBalance && (
                            <div className="mt-3 text-center">
                                <h3 className="balance">Usable Balance: {usableBalance}</h3>
                                <h3 className="balance">Total Balance: {totalBalance}</h3>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Balance;
