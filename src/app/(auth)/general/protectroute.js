import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '@/services/firebaseConfig';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default ProtectedRoute;
