import React from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useRef } from 'react';

const Modal = ({
    addNewCategory,
    category,
    categories,
    setCategory,
    bank,
    setBank,
    saveBank,
    clearAllCategories,
}) => {
    const inputEl = useRef(null);

    return (
        <div className='modal-window'>
            <InputGroup className='mb-3'>
                <DropdownButton
                    variant='outline-secondary'
                    title='Recently added'
                    id='input-group-dropdown-1'>
                    {categories.map((categoryItem) => (
                        <Dropdown.Item
                            onClick={(e) =>
                                setCategory(categoryItem.categoryName)
                            }>
                            {categoryItem.categoryName}
                        </Dropdown.Item>
                    ))}
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={(e) => clearAllCategories()}>
                        Clear all
                    </Dropdown.Item>
                </DropdownButton>
                <Form.Control
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    aria-label='Text input with dropdown button'
                />
            </InputGroup>
            <InputGroup className='mb-3'>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                    ref={inputEl}
                    aria-label='Amount (to the nearest dollar)'
                />
                <InputGroup.Text>.00</InputGroup.Text>
                <Button
                    onClick={(e) => saveBank(inputEl.current.value)}
                    variant='success'>
                    Set bank
                </Button>{' '}
            </InputGroup>
            <Button onClick={addNewCategory} variant='success'>
                Create category
            </Button>{' '}
        </div>
    );
};

export default Modal;
