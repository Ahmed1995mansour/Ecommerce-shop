import React from 'react';
import { useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import { auth, updatePassword } from '../../firebase';
import { PrimaryLoader } from '../../components/Helpers/Loaders';
import { toast } from 'react-toastify';

const Password = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = await auth.currentUser;
    updatePassword(user, password)
      .then(() => {
        setLoading(false);
        setPassword('');
        toast.success('Password Updated');
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
        console.log(err);
      });
  };

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label>Your Password</label>
        <input
          className='form-control'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter New Password'
          disabled={loading}
        />
        <button
          className='btn btn-primary'
          disabled={password.length < 6 || loading}
        >
          Submit
        </button>
      </div>
    </form>
  );
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <UserNav />
        </div>
        <div className='col-md-10'>
          {loading ? <PrimaryLoader /> : <h4>Password Update</h4>}
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
