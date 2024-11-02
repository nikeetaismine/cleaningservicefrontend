import { useEffect, useState } from "react";
import { getAllCleaningServices } from "../utils/ApiFunctions";
import { Link } from "react-router-dom";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";

// eslint-disable-next-line no-unused-vars
const CleaningServiceCarousel = ({ id }) => {
  const [cleaningServices, setCleaningServices] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllCleaningServices()
      .then((data) => {
        setCleaningServices(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="mt-5">Loading cleaning services....</div>;
  }
  if (errorMessage) {
    return <div className="text-danger mb-5 mt-5">Error : {errorMessage}</div>;
  }

  return (
    <section className="bg-light mb-5 mt-5 shadow">
      <Container>
        <Carousel indicators={false}>
          {[...Array(Math.ceil(cleaningServices.length / 4))].map(
            (_, index) => (
              <Carousel.Item key={index}>
                <Row>
                  {cleaningServices
                    .slice(index * 4, index * 4 + 4)
                    .map((cleaningServices) => (
                      <Col
                        key={cleaningServices.id}
                        className="mb-4"
                        xs={12}
                        md={6}
                        lg={3}
                      >
                        <Card>
                          <Link to={`/book-service/${cleaningServices.id}`}>
                            <Card.Img
                              variant="top"
                              src={`data:image/png;base64, ${cleaningServices.photo}`}
                              alt="Service Photo"
                              className="w-100"
                              style={{ height: "200px" }}
                            />
                          </Link>
                          <Card.Body>
                            <Card.Title className="hotel-color">
                              {cleaningServices.name}
                            </Card.Title>
                            <Card.Title className="room-price">
                              Ksh. {cleaningServices.price}
                            </Card.Title>
                            <div className="flex-shrink-0">
                              <Link
                                to={`/book-service/${cleaningServices.id}`}
                                className="btn btn-hotel btn-sm"
                              >
                                Book Now
                              </Link>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                </Row>
              </Carousel.Item>
            )
          )}
        </Carousel>
      </Container>
    </section>
  );
};

export default CleaningServiceCarousel;
