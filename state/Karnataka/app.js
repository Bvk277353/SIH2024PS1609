import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Fade } from "react-reveal";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const data = [
    {
      title: "Rainwater Harvesting",
      img: "rainwater_harvesting_karnataka.jpg",
      shortDesc: "Capturing and storing rainwater to combat water scarcity.",
      fullDesc:
        "Rainwater harvesting involves collecting rainwater from rooftops and storing it for household and agricultural use. Karnataka has implemented this extensively in urban areas like Bengaluru to address water scarcity issues. This method also helps recharge groundwater levels.",
      reference: "https://bwssb.gov.in",
    },
    {
      title: "Wastewater Recycling",
      img: "wastewater_recycling_karnataka.jpg",
      shortDesc: "Purifying and reusing wastewater for non-potable uses.",
      fullDesc:
        "Advanced treatment plants in Karnataka process wastewater, making it usable for landscaping, industrial processes, and agriculture. This reduces dependency on fresh water sources and promotes sustainability.",
      reference: "https://cpcb.nic.in",
    },
    {
      title: "Drip Irrigation",
      img: "drip_irrigation_karnataka.jpg",
      shortDesc: "Efficient water delivery directly to crop roots.",
      fullDesc:
        "Drip irrigation systems in Karnataka's agricultural regions minimize water wastage by delivering water directly to the plant roots. This reduces evaporation losses and improves crop yield while conserving water.",
      reference: "https://pmksy.gov.in",
    },
  ];

  const handleShowModal = (item) => {
    setModalContent(item);
    setShowModal(true);
  };

  return (
    <Container fluid style={{ backgroundColor: "#f0f8ff", paddingBottom: "50px" }}>
      <header
        style={{
          backgroundColor: "#00509e",
          color: "white",
          padding: "20px 0",
          textAlign: "center",
        }}
      >
        <h1>Water Conservation Methods in Karnataka</h1>
        <p>Innovative Strategies for Sustainable Water Management</p>
      </header>

      <Container className="my-5">
        <Row>
          {data.map((item, index) => (
            <Col md={4} className="mb-4" key={index}>
              <Fade bottom>
                <Card style={{ height: "100%" }}>
                  <Card.Img
                    variant="top"
                    src={item.img}
                    alt={item.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.shortDesc}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => handleShowModal(item)}
                    >
                      Learn More
                    </Button>
                  </Card.Body>
                </Card>
              </Fade>
            </Col>
          ))}
        </Row>
      </Container>

      <footer
        style={{
          backgroundColor: "#003f7d",
          color: "white",
          textAlign: "center",
          padding: "15px 0",
        }}
      >
        <p>© 2024 Karnataka Water Conservation Initiative. All rights reserved.</p>
        <p>
          Learn more at{" "}
          <a href="https://www.karnataka.gov.in" style={{ color: "#ffcc00" }}>
            karnataka.gov.in
          </a>
        </p>
      </footer>

      {/* Modal for Detailed Content */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={modalContent.img}
            alt={modalContent.title}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
          <p className="mt-3">{modalContent.fullDesc}</p>
          <p>
            <strong>Reference:</strong>{" "}
            <a href={modalContent.reference} target="_blank" rel="noopener noreferrer">
              {modalContent.reference}
            </a>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default App;
