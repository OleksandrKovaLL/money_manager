import React, { useState, useRef } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import {useNavigate} from 'react-router-dom';

import { AiFillDollarCircle } from "react-icons/ai";


const PostItem = ({post, newSpend, setNewSpend, editPostTotal, deletePost, 
    createExpense, dicreaseBank, updateExpensesArray, increaseBank}) => {

    const navigate = useNavigate()
    const popoverRef = useRef();
    const [show, setShow] = useState(false);

    const handleClick = (e) => {
        setShow(!show)
        setNewSpend('')
    }

    const popover = (
        <Popover id="popover-basic">
          <Popover.Header
            as="h3">{post.categoryName}
          </Popover.Header>
          <Popover.Body>
            <input
            ref={popoverRef}
            value={newSpend}
            onChange={(e) => setNewSpend(e.target.value)} 
            placeholder='Enter yout spend'/>
            <Button className="popover-btn"
                onClick={() => {
                    editPostTotal(post.id, newSpend)
                    dicreaseBank(newSpend)
                    createExpense(newSpend, post.categoryName)
                    }} variant="success">Set
            </Button>
          </Popover.Body>
        </Popover>
      );
      
    return (
        <div className='post'>
            <div className='post__content'>
               <AiFillDollarCircle className='icon'/>  {post.categoryName}
                <strong className='total'>{post.amount} $</strong>
            </div>
            <div className='post__btns'>
            <OverlayTrigger trigger="click" placement="top" overlay={popover}>
                {
                    show 
                    ? <Button onClick={handleClick} variant="danger">Close</Button>
                    : <Button className="btn-success"onClick={handleClick} variant="success">Edit</Button>
                }
            </OverlayTrigger>
            <Button onClick={() => {
                navigate(`/posts/${post.categoryName}`)
                // filterExpensesByCategortKey(post.categoryName)
                }} variant="primary">Info

            </Button>
           
            <CloseButton onClick={() => {
                deletePost(post.id)
                updateExpensesArray(post.categoryName)
                increaseBank(post.amount)
            }}className="close-btn"/>
            </div>
        </div>
    );
};

export default PostItem;