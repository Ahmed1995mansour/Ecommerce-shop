import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { getCurrentAdmin } from '../../functions/auth';

const AdminRoute = ({ comp, ...res }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      getCurrentAdmin(user.token)
        .then((res) => {
          setOk(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);
  return ok ? <Route {...res} /> : <LoadingToRedirect />;
};

export default AdminRoute;
