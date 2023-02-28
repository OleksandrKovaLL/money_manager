import React from 'react';
import { useEffect, useState, useContext } from "react";
import PostList from "../components/PostList";
import Total from "../components/Total";
import MyBank from '../components/MyBank';
import '../styles/App.css'
import Modal from "../UI/modal/Modal";
import { useParams } from 'react-router-dom'


import {ExpensesArray} from "../context";


const Posts = () => {

    const {expenses, setExpenses, posts, setPosts, bank, setBank, setAmount, amount} = useContext(ExpensesArray)

    const [categories, setCategories] = useState(localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : [])

    const [category, setCategory] = useState('');
    const [total, setTotal] = useState(0);
    const [newSpend, setNewSpend] = useState('');


    const updateExpensesArray = (param) => {
        let updatedExpensesArray;
        if (param) {
            console.log(param, "param")
            updatedExpensesArray =  [...expenses].filter(expense => expense.categoryKey !== param)
            console.log(updatedExpensesArray, "updatedExpensesArray")
        }

        if (updatedExpensesArray.length > 0) {
            localStorage.removeItem('expenses')
            setExpenses(updatedExpensesArray)
        }
       
        // localStorage.removeItem('expenses')
        // localStorage.setItem('expenses', JSON.stringify(updatedExpensesArray));
    }


    const isExistCategory = (array) => {
        let categoryIsExist;
       return categoryIsExist = array.find(elem => elem.categoryName === category)
    }

    const fixAmountInput = () => {
        let formattedAmount
        formattedAmount = amount.replace(/^[\D0]+|\D/g, '');
       
        return formattedAmount
    }

    const validateInputs = () => {
        if (category === '') {
            alert('Please, fill all the required fields')
            return false
        }

       return true
    }

    const saveCategory = () => {
        const newCategory = {
            id: categories.length + 1,
            categoryName: category
        }
        setCategories([...categories, newCategory])
    }


    const calculateCategoryAmount = (id, array) => {
        console.log(id, "IDD")
       return [...array]
        .filter(expense => expense.categoryKey === id)
        .reduce((acc, curr) =>  acc + Number(curr.amount), 0);
    }

    const clearAllCategories = () => {
        setCategories([]);
    }

    const addNewPost = (e) => {
        
        let validate = validateInputs()

        if (validate) {
            e.preventDefault();
            const newPost = {
                id: Date.now() ,
                categoryName: category,
                amount : fixAmountInput(),
            }
            
            let categoryIsExist = isExistCategory(categories)
            let postCategoryIsExist = isExistCategory(posts)

            if(!categoryIsExist) {
                saveCategory()  
            }
            
            if(!postCategoryIsExist) {
                setPosts([...posts, newPost]);
            }
            
            else {
                alert("This category already exists")
            }

            setCategory('')
            setAmount('')
        }
        
    }

    const calculateTotal = () => {
        const totalSum = posts.reduce((acc, curr) =>  acc + Number(curr.amount), 0);
        setTotal(totalSum);
    }

    const formatDate = (date) => {

        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        var yy = date.getFullYear();
        if (yy < 10) yy = '0' + yy;

        return dd + '.' + mm + '.' + yy;
    } 

    const createExpense = (newSpand, categoryName) => {
        const newExpense = {
            id: Date.now(),
            amount: newSpand,
            date: formatDate(new Date()),
            icon: 'icon',
            categoryKey: categoryName
        }

        setExpenses([...expenses, newExpense])

        console.log(expenses)
    }

    const dicreaseBank = (amount) => {
        let newBankAmount = bank - amount
        setBank(newBankAmount)
        localStorage.setItem('amountBank', JSON.stringify(newBankAmount));
    }

    const increaseBank = (amount) => {
        let newBankAmount = bank + Number(amount)
        setBank(newBankAmount)
        localStorage.setItem('amountBank', JSON.stringify(newBankAmount));
    }

    const filterExpensesByCategortKey = (categoryName) => {
        console.log(categoryName, 'catName')
       let filtered = expenses.filter(expense => expense.categoryKey === categoryName)
       console.log(filtered, 'filter')
       setExpenses(filtered)
       console.log('Function work')
       console.log(expenses, 'expArray')
    }

    const editPostTotal = (id, newSpand) => { 
      const newAmount = posts.map((post) => (
            post.id === id
              ? {...post, amount:  Number(post.amount) + Number(newSpand) }
              : post
        ))

        setPosts(newAmount)
        setNewSpend('')
    }

    const saveBank = (amount) => {
        setBank(amount)
        localStorage.setItem('amountBank', JSON.stringify(amount));
    }

    const deletePost = (id) => {
        const arrayResult = posts.filter(post => post.id !== id)
        setPosts(arrayResult)
    }

    useEffect(() => {
        calculateTotal()
        localStorage.setItem('posts', JSON.stringify(posts));
        localStorage.setItem('categories', JSON.stringify(categories));
    }, [posts, categories])

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses])

    useEffect(() => {
        const arrayPosts = JSON.parse(localStorage.getItem('posts'));
        const arrayCategories = JSON.parse(localStorage.getItem('categories'));
        const bankAmount = JSON.parse(localStorage.getItem('amountBank'));
        
        if (arrayPosts) {
            setPosts(arrayPosts)
        }
        
        if (arrayCategories) {
            setCategories(arrayCategories)
        }

        if (bankAmount) {
            setBank(bankAmount)
        }

    }, [])

    return (
        <div className="App">
            <Total total={total}/>
            <MyBank bank={bank}/>
            <Modal 
                addNewCategory={addNewPost} 
                setCategory={setCategory} 
                setAmount={setAmount}
                setBank={setBank}
                clearAllCategories={clearAllCategories}
                saveBank={saveBank}
                category={category} 
                amount={amount}
                categories={categories}
                bank={bank}
            />
            <PostList 
                posts={posts} 
                newSpend={newSpend} 
                setNewSpend={setNewSpend} 
                editPostTotal={editPostTotal}
                createExpense={createExpense}
                deletePost={deletePost}
                dicreaseBank={dicreaseBank}
                increaseBank={increaseBank}
                filterExpensesByCategortKey={filterExpensesByCategortKey}
                calculateCategoryAmount={calculateCategoryAmount}
                updateExpensesArray={updateExpensesArray}  
            />
        </div>
    );
};

export default Posts;