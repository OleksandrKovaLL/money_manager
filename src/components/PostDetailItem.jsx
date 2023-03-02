import React from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import { AiFillDollarCircle } from 'react-icons/ai';

const PostDetailItem = ({ expense, deleteExpense, dicreaseBank }) => {
    return (
        <div className='post'>
            <div className='post__content'>
                <AiFillDollarCircle className='icon' />
                <strong className='total'>{expense.amount} $</strong>
                <div className='date'>{expense.date}</div>
            </div>
            <div className='post__btns'>
                <CloseButton
                    onClick={() => {
                        deleteExpense(expense.id);
                        dicreaseBank(expense.amount);
                    }}
                    className='close-btn_info'
                />
            </div>
        </div>
    );
};

export default PostDetailItem;
