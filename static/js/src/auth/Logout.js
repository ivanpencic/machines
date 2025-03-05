import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../utils/GlobalContext';
import { useMutation } from '@tanstack/react-query';
import { Button } from 'react-bootstrap';

function Logout() {
  const { setIsAuthenticated, setUser } = useGlobal();
  const navigate = useNavigate();

  // useMutation za odjavu korisnika koristeći fetch
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/logout/', {
        method: 'POST',
        credentials: 'include', // Uključi kolačiće (za Django sesije)
      });

      if (!response.ok) {
        throw new Error('Greška pri odjavi');
      }
    },
    onSuccess: () => {
      setIsAuthenticated(false);
      setUser(null);
      navigate('/login');
    },
    onError: (error) => {
      console.error('Greška pri odjavi:', error.message);
    },
  });

  return (
    <Button variant="danger" onClick={() => logoutMutation.mutate()} disabled={logoutMutation.isLoading}>
      {logoutMutation.isLoading ? 'Odjavljivanje...' : 'Odjavi se'}
    </Button>
  );
}

export default Logout;
