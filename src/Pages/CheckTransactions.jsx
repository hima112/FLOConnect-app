// CheckTransactions.js
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

function CheckTransactions() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:7000/api/gettransactions');
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='card'>
            <h2 style={{ color:'white' }}>Transactions</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Block Height</th>
                        <th>Transaction ID</th>
                        <th>Receiver</th>
                        <th>Data</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction._id}>
                            <td>{transaction.blockheight}</td>
                            <td>{transaction.txid}</td>
                            <td>{transaction.receiver}</td>
                            <td>{transaction.floData}</td>
                            <td>{new Date(transaction.created_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default CheckTransactions;
