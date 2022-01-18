import React, { useState, useEffect } from 'react';
import { auth, sendPasswordResetEmail } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { PrimaryLoader } from '../../components/Helpers/Loaders';

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push('/');
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };
    await sendPasswordResetEmail(auth, email, config)
      .then((result) => {
        setEmail('');
        setLoading(false);
        toast.success('Reset Link sent to Email');
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        setLoading(false);
      });
  };

  return (
    <div className='container col-md-6 offset-md-3 p-5'>
      {loading ? <PrimaryLoader /> : <h4>Reset Password</h4>}
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='email'
            className='form-control'
            placeholder='Your Email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            autoFocus
          />
        </div>
        <button className='btn btn-raised' disabled={!email}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
