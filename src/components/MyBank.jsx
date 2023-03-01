import React from 'react';

const MyBank = ({bank}) => {
    return (
        <span className="bank-amount">
            Bank <strong>{bank} $</strong>    
        </span>
    );
};

export default MyBank;