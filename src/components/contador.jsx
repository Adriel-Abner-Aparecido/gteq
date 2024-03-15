import React, { useState, useEffect } from 'react';

const Counter = ({ finalNumber }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < finalNumber) {
        setCount(prevCount => prevCount + 1);
      } else {
        clearInterval(interval);
      }
    }, 1700/finalNumber);

    return () => clearInterval(interval);
  }, [count, finalNumber]);

  return (
    <>
      {count}%
    </>
  );
};

export default Counter;