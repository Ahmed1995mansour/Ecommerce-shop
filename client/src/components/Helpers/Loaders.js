import React from 'react';

const PrimaryLoader = () => {
  return (
    <div className='spinner-border text-primary' role='status'>
      <span className='sr-only'>Loading...</span>
    </div>
  );
};

export { PrimaryLoader };
