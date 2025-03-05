import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../utils/GlobalContext';
import { useMutation } from '@tanstack/react-query';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setIsAuthenticated, setUser } = useGlobal();
  const navigate = useNavigate();

  // Koristimo useMutation za slanje zahteva za prijavu
  const loginMutation = useMutation({
    mutationFn: async ({ username, password }) => {
      const response = await fetch('/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error('Pogrešno korisničko ime ili lozinka');
      }
  
      return response.json();
    },
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setUser(data.user);
      navigate('/');
    },
    onError: (error) => {
      setError(error.message);
    },
  });
  

  const handleLogin = (event) => {
    event.preventDefault();
    setError(null);  // Resetuj grešku pre slanja zahteva
    loginMutation.mutate({ username, password });  // Pošalji zahtev za prijavu
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Prijava</h2>
      {error && <Alert variant="danger">{error}</Alert>}  {/* Prikaži grešku ako postoji */}
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Korisničko ime</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesite korisničko ime"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Lozinka</Form.Label>
          <Form.Control
            type="password"
            placeholder="Unesite lozinku"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loginMutation.isLoading}>
          {loginMutation.isLoading ? 'Prijavljivanje...' : 'Prijavi se'}
        </Button>
      </Form>
    </Container>
  );
}

export default Login;