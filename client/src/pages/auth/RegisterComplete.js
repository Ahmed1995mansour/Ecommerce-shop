import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth, signInWithEmailLink, updatePassword } from '../../firebase';
import { toast } from 'react-toastify';
import { createOrUpdateUser } from '../../functions/auth';

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.token) history.push('/');
    setEmail(window.localStorage.getItem('emailForRegisteration'));
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      toast.error('Email and Password is required');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 charachers long');
      return;
    }
    try {
      const result = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        // remove email from Local Storage
        window.localStorage.removeItem('emailForRegistraion');
        // Fetch Currently logged in user
        let user = auth.currentUser;
        // Update the password
        await updatePassword(user, password);
        // Fetch id token
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            history.push('/');
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.message);
          });
        // Redirect
        history.push('/');
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type='email' className='form-control' value={email} disabled />
      <input
        type='password'
        className='form-control'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
        autoFocus
      />
      <br />
      <button type='submit' className='btn btn-raised'>
        Complete Registeration
      </button>
    </form>
  );
  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Complete Register</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
