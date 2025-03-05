import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container className="text-center mt-5">
      <h1 className="display-3 text-danger">404</h1>
      <h2>Stranica nije pronađena</h2>
      <p className="text-muted">
        Stranica koju tražite ne postoji ili je premještena.
      </p>
      <Button variant="primary" onClick={() => navigate('/')}>
        Vrati se na početnu
      </Button>
    </Container>
  );
}

export default NotFound;
