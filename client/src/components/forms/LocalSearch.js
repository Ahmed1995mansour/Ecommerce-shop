import React from 'react';

const LocalSerach = ({ keyword, setKeyword }) => {
  const handleSearchChange = (e) => {
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <input
      className='form-control mb-4'
      type='search'
      placeholder='Filter'
      value={keyword}
      onChange={handleSearchChange}
    />
  );
};

export default LocalSerach;
