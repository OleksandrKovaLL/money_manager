import React from 'react';

const Total = ({total}) => {
    return (
        <span className="total-amount">
            Total <strong>{total} $</strong>    
        </span>
    );
};

export default Total;