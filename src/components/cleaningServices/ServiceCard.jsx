import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const ServiceCard = ({ cleaningService }) => {
  return (
    <Col key={cleaningService.id} className="mb-4" xs={12}>
      <Card>
        <Card.Body className="d-flex flex-wrap align-items-center">
          <div className="flex-shrink-0 mr-3 mb-3 mb-md-0">
            <Link to={`/book-service/${cleaningService.id}`}>
              <Card.Img
                variant="top"
                src={`data:image/jpeg;base64, ${cleaningService.photo}`}
                alt="Service Photo"
                style={{ width: "100%", maxWidth: "200px", height: "auto" }}
              />
            </Link>
          </div>
          <div className="flex-grow-1 ml-3 px-5">
            <Card.Title className="hotel-color">
              {cleaningService.name}
            </Card.Title>
            <Card.Title className="room-price">
              Ksh. {cleaningService.price}
            </Card.Title>
            <Card.Text>{cleaningService.description}</Card.Text>
          </div>
          <div className="flex-shrink-0 mt-3">
            <Link
              to={`/book-service/${cleaningService.id}`}
              className="btn btn-hotel btn-sm"
            >
              Book Now
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ServiceCard;
