
import React, {useState} from 'react';
import { Image as BootstrapImage, Col, Row} from 'react-bootstrap';

export const MachineImages = ({machine}) => {
    const [selectedImage, setSelectedImage] = useState(machine.images.length ? machine.images[0]: null);

    return (
        <Col md={6} className="d-flex flex-column">
            {/* Glavna slika */}
            <div className="flex-grow-1 d-flex align-items-center justify-content-center">
              {selectedImage && (
                <BootstrapImage
                  src={selectedImage.url}
                  fluid
                  thumbnail
                  style={{ maxHeight: '400px', width: 'auto' }}
                />
              )}
            </div>

            {/* Ostale slike (ispod glavne) */}
            <div className="mt-3">
              <h4>Other Images</h4>
              <div className="d-flex flex-wrap">
                {machine.images.map((image) => (
                  <BootstrapImage
                    key={image.id}
                    src={image.url}
                    fluid
                    thumbnail
                    className="m-2"
                    style={{ cursor: 'pointer', width: '100px', height: '100px' }}
                    onClick={() => setSelectedImage(image)}
                  />
                ))}
              </div>
            </div>
          </Col>
    );
}