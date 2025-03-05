import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaImage } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useMachineListQuery } from './api/machinesList'
import './MachineList.css';

const MachineList = () => {
  const { data: machines, isLoading, isError } = useMachineListQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching machines</div>;
  }

  return (
    <Container>
      <Row xs={1} md={2} lg={3} className="g-4">
        {machines.map((machine) => (
          <Col key={machine.id}>
            <Link to={`/machines/${machine.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card className="machine-card">
                <MachineListItem images={machine.images} />
                <Card.Body className="card-body">
                  <Card.Title className="card-title">{machine.identifier}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

// Komponenta za prikaz slike ili ikonice
const MachineListItem = ({ images }) => {
  const [imageError, setImageError] = useState(false);
  let imageUrl = null;

  images.forEach(img => {
    if (img.tags.includes("main")) {
      imageUrl = img.url;
    }
  });
  
  
  // Ako nema URL-a za sliku ili je došlo do greške pri učitavanju, prikaži ikonicu
  if (!imageUrl || imageError) {
    // debugger;
    return (
      <div className="no-image">
        <FaImage />
      </div>
    );
  }

  // Ako postoji URL za sliku, prikaži sliku
  return (
    <Card.Img
      variant="top"
      src={imageUrl}
      alt="Machine"
      onError={() => setImageError(true)} // Postavi imageError na true ako slika ne može da se učita
    />
  );
};

export default MachineList;