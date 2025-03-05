import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGlobal } from '../utils/GlobalContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useGlobal();

  if (!isAuthenticated) {
    // Ako korisnik nije ulogovan, preusmeri ga na login stranicu
    return <Navigate to="/login" />;
  }

  // Ako je korisnik ulogovan, prikaži komponentu
  return children;
}

export default ProtectedRoute;