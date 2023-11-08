import React from 'react';

export const withAuth = (WrappedComponent) => {
  return (props) => {
    // Check if the user is authenticated based on session storage or any other logic.
    const isAuthenticated = sessionStorage.getItem('admin_token');

    if (!isAuthenticated) {
      // If the user is not authenticated, you can redirect them to a login page
      // or another route of your choice.
      // Example: Redirect to the login page.
      console.warn(process.env.REACT_APP_UI+"/admin/login")
      window.open(process.env.REACT_APP_UI + "/admin/login", "_self");
      return null;
    }
    // Return the WrappedComponent with its props if the user is authenticated.
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
