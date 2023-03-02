import React, { useContext, useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import PostDetailList from '../components/PostDetailList';
import Total from '../components/Total';
import { ExpensesArray } from '../context';

const CategoryDetail = () => {
    let params = useParams();

    const { expenses, setExpenses, posts, setPosts, bank, setBank } =
        useContext(ExpensesArray);

    const [expensesTotal, setExpensesTotal] = useState(0);

    const calculateTotal = (array) => {
        const totalSum = array.reduce(
            (acc, curr) => acc + Number(curr.amount),
            0
        );

        setExpensesTotal(totalSum);
    };

    const setPostTotal = (id, array) => {
        const expensesTotal = array.reduce(
            (acc, curr) => acc + Number(curr.amount),
            0
        );

        const newAmount = posts.map((post) =>
            post.categoryName === id ? { ...post, amount: expensesTotal } : post
        );

        setPosts(newAmount);
    };

    const dicreaseBank = (amount) => {
        let newBankAmount = bank - amount;
        setBank(newBankAmount);
        localStorage.setItem('amountBank', JSON.stringify(newBankAmount));
    };

    const deleteExpense = (id) => {
        console.log(id, 'ID');
        const arrayResult = expenses.filter((expense) => expense.id !== id);
        setExpenses(arrayResult);
    };

    const filterExpensesByCategortKey = (array, categoryName) => {
        if (params.id) {
            return [...array].filter(
                (expense) => expense.categoryKey === categoryName
            );
        }

        return array;
    };

    const arrayExpenses = useMemo(() => {
        const arrayExpenses = JSON.parse(localStorage.getItem('expenses'));
        if (arrayExpenses) {
            const filteredArrayExpenses = filterExpensesByCategortKey(
                expenses,
                params.id
            );
            return filteredArrayExpenses;
        }
    }, [expenses]);

    useEffect(() => {
        calculateTotal(arrayExpenses);
        setPostTotal(params.id, arrayExpenses);
    }, [expenses]);

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);

    useEffect(() => {
        const arrayExpanses = JSON.parse(localStorage.getItem('expenses'));
        if (arrayExpanses) {
            setExpenses(arrayExpanses);
        }
    }, []);

    return (
        <div className='App'>
            <Total total={expensesTotal} />
            <PostDetailList
                expenses={arrayExpenses}
                dicreaseBank={dicreaseBank}
                params={params}
                deleteExpense={deleteExpense}
            />
        </div>
    );
};

export default CategoryDetail;
