import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'

const RequireAuth = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const location = useLocation();

  {/* only if we have a user we use this Outlet which in App is encapsuled RequireAUth with Element of RequireAUth*/ }
  {/* Else we naviate to the login page replace the login in nav.history*/ }
  return (
    allowedRoles?.includes(user?.data?.autoritzacio)
      ? <Outlet />
      : user
        ? <Navigate to='unauthorized' state={{ from: location }} replace />
        : <Navigate to="/" state={{ from: location }} replace />
  )
}

export default RequireAuth;