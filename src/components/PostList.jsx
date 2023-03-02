import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import PostItem from './PostItem';

const PostList = ({
    posts,
    newSpend,
    setNewSpend,
    editPostTotal,
    deletePost,
    createExpense,
    dicreaseBank,
    filterExpensesByCategortKey,
    calculateCategoryAmount,
    updateExpensesArray,
    increaseBank,
}) => {
    if (posts.length === 0) {
        return <h1 className='no-posts'>No posts yet</h1>;
    }

    return (
        <div className='post-list'>
            {posts.map((post) => (
                <ListGroup>
                    <ListGroup.Item>
                        <PostItem
                            post={post}
                            newSpend={newSpend}
                            setNewSpend={setNewSpend}
                            editPostTotal={editPostTotal}
                            createExpense={createExpense}
                            deletePost={deletePost}
                            filterExpensesByCategortKey={
                                filterExpensesByCategortKey
                            }
                            calculateCategoryAmount={calculateCategoryAmount}
                            dicreaseBank={dicreaseBank}
                            updateExpensesArray={updateExpensesArray}
                            increaseBank={increaseBank}
                        />
                    </ListGroup.Item>
                </ListGroup>
            ))}
        </div>
    );
};

export default PostList;
