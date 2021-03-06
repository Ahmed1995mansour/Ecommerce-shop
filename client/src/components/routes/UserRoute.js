import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';

const UserRoute = ({ comp, ...res }) => {
  const { user } = useSelector((state) => ({ ...state }));
  return user && user.token ? <Route {...res} /> : <LoadingToRedirect />;
};

export default UserRoute;
