import React from 'react';

const CategoryForm = ({ handleSubmit, name, setName, placeholder }) => (
  <form onSubmit={handleSubmit}>
    <div className='form-group'>
      <label>Name</label>
      <input
        type='text'
        className='form-control'
        placeholder={placeholder}
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
        required
      />
      <br />
      <button className='btn btn-primary' disabled={!name || name.length < 2}>
        save
      </button>
    </div>
  </form>
);

export default CategoryForm;
