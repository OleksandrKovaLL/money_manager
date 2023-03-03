import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ExpensesArray } from './context';

import './styles/App.css';
import AppRouter from './components/AppRouter';

function App() {
    const [expenses, setExpenses] = useState(
        localStorage.getItem('expenses')
            ? JSON.parse(localStorage.getItem('expenses'))
            : []
    );

    const [posts, setPosts] = useState(
        localStorage.getItem('posts')
            ? JSON.parse(localStorage.getItem('posts'))
            : []
    );

    const [bank, setBank] = useState(0);
    const [amount, setAmount] = useState('');

    return (
        <ExpensesArray.Provider
            value={{
                expenses,
                setExpenses,
                posts,
                setPosts,
                bank,
                setBank,
                amount,
                setAmount,
            }}>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </ExpensesArray.Provider>
    );
}

export default App;
