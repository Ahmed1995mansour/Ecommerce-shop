import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currCount) => --currCount);
    }, 1000);
    count === 0 && history.push('/');
    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <div className='container text-center p-5'>
      <p>Redirecting you in {count}</p>
    </div>
  );
};

export default LoadingToRedirect;
