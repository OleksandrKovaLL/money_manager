import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup';
import PostDetailItem from './PostDetailItem';

const PostDetailList = ({ expenses, params, deleteExpense, dicreaseBank }) => {
    return (
        <div>
            <div className='post-list'>
                <strong>{params.id}</strong>
                {expenses.map((expense) => (
                    <ListGroup>
                        <ListGroup.Item>
                            <PostDetailItem
                                dicreaseBank={dicreaseBank}
                                expense={expense}
                                deleteExpense={deleteExpense}
                            />
                        </ListGroup.Item>
                    </ListGroup>
                ))}
            </div>
        </div>
    );
};

export default PostDetailList;
