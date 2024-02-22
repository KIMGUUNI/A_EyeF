import React from 'react';

const PayResult = ({ totalAmount }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <h1 style={{  fontSize: '1.9rem', margin: '0', marginBottom: '10px'}}>결제 금액: {totalAmount}원</h1>
    </div>
  );
}

export default PayResult;
