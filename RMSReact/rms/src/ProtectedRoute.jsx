import React from 'react'
import { useSelector } from "react-redux"
import { Navigate } from 'react-router'

function ProtectedRoute({ children }) {

  const user = useSelector((state) => state.user)

  // useEffect(() => {
  //   const userId = localStorage.getItem('userId')
  //   const ownerId = localStorage.getItem('ownerId')
  //   const token = localStorage.getItem('token');
  //   if(localStorage.getItem('role')==="SuperAdmin")
  //   {
  //     dispatch(setAuthenticated({userId:userId, isAuthenticated: !!token }));
  //   }
  //   else{
  //     dispatch(setAuthenticated({ownerId:ownerId, isAuthenticated: !!token }));
  //   }
  // }, [dispatch]);

  return user.user.isAuthenticated ? children : <Navigate to='/' />
}

export default ProtectedRoute