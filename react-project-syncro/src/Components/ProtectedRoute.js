/*Introduce permissions.js file to include permissions for other parts of the application. and I Create a Higher-Order Component (HOC) for Protected Routes*/

//Creating an HOC that wraps routes and checks if the user has permission to access them. So, Applying the HOC to our routes to can protect them based on user roles.

// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { hasPermission } from '../utils/hasPermission';

const ProtectedRoute = ({ component: Component, requiredRole, ...rest }) => {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={props =>
        hasPermission(user.roles, requiredRole) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/unauthorized" />
        )
      }
    />
  );
};

export default ProtectedRoute;

