import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Image as BootstrapImage, Table } from 'react-bootstrap';
import { useMachineDetailsQuery } from './api/machineDetails'
import { MachineImages } from './MachineImages'
import { MachineTransactions } from './MachineTransactions'

const MachineDetails = () => {
  const { machineId } = useParams();
  
  const { data:machine, isLoading, isError } = useMachineDetailsQuery({machineId});
  
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching machine details...</div>;
  }


    return (
      <Container>
        <Row className="my-4" style={{ height: '100%' }}>
          {/* Kolona za slike (levo) */}
          <MachineImages machine={machine} />
          

          {/* Kolona za detalje (desno) */}
          <Col md={6}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{machine.identifier}</Card.Title>
                <Card.Text>
                  <strong>Type:</strong> {machine.machine_type || 'N/A'}<br />
                  <strong>Location:</strong> {machine.location || 'N/A'}<br />
                  <strong>Date Added:</strong> {machine.date_added}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Dugmad za akcije */}
        <Row className="my-4">
          <Col>
            <Button variant="primary" className="me-2">
              Add Image
            </Button>
            <Button variant="secondary" className="me-2">
              Enter Cost
            </Button>
            <Button variant="success" className="me-2">
              Enter Income
            </Button>
            <Button variant="warning">
              Change Location
            </Button>
          </Col>
        </Row>

      {/* Transakcije */}
      <MachineTransactions machine={machine} />
      </Container>
        );
}

export default MachineDetails;