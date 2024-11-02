
import { Row, Col, Card } from "react-bootstrap";
import Header from "./Header";
import { FaClock } from "react-icons/fa";
import { TbWindow, TbIroning2 } from "react-icons/tb";
import { PiOfficeChairDuotone } from "react-icons/pi";
import { GiVacuumCleaner } from "react-icons/gi";
import { BsHouseCheck } from "react-icons/bs";
import {
  MdOutlineDryCleaning,
  MdOutlineLocalLaundryService,
  MdOutlineCleaningServices,
} from "react-icons/md";

const CleaningServices = () => {
  return (
    <>
      <div className="mb-2">
        <Header title={"Our Services"} />

        <Row className="mt-4">
          <h4 className="text-center">
            Cleaning Services at{" "}
            <span className="hotel-color"> Ventures - </span>
            <span className="gap-2">
              <FaClock className="ml-5" /> 24-Hour Front Desk
            </span>
          </h4>
        </Row>
        <hr />

        <Row xs={1} md={2} lg={3} className="g-4 mt-2">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <TbIroning2 /> Ironing
                </Card.Title>
                <Card.Text>Ironing of clothes and garments</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <MdOutlineDryCleaning /> Dry Cleaning
                </Card.Title>
                <Card.Text>
                  Professional dry cleaning for delicate fabrics
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <MdOutlineLocalLaundryService /> Laundry
                </Card.Title>
                <Card.Text>
                  Keep your clothes clean and fresh with our laundry service.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <MdOutlineCleaningServices /> Deep Cleaning
                </Card.Title>
                <Card.Text>
                  A thorough cleaning of hard-to-reach areas
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <PiOfficeChairDuotone /> Office Cleaning
                </Card.Title>
                <Card.Text>
                  Cleaning services tailored for office spaces
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <TbWindow /> Window Cleaning
                </Card.Title>
                <Card.Text>Cleaning of windows inside and outside</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <GiVacuumCleaner /> Carpet Cleaning
                </Card.Title>
                <Card.Text>Deep cleaning of carpets and rugs</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <BsHouseCheck /> House Cleaning
                </Card.Title>
                <Card.Text>
                  General cleaning of all rooms in the house
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <hr />
    </>
  );
};

export default CleaningServices;
