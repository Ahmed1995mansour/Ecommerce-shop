import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { auth, sendSignInLinkToEmail } from '../../firebase';
import { toast } from 'react-toastify';

const Register = ({ history }) => {
  const [email, setEmail] = useState('');
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) history.push('/');
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await sendSignInLinkToEmail(auth, email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete your registeration`
    );

    // Save email to local storage
    window.localStorage.setItem('emailForRegisteration', email);

    // Clear state
    setEmail('');
  };
  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        className='form-control'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Your Email'
        autoFocus
      />
      <br />
      <button type='submit' className='btn btn-raised'>
        Register
      </button>
    </form>
  );
  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
