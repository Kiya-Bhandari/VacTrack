import React from "react";
import { Button, Card } from "react-bootstrap";
import Base from "../../components/common/Base";
import FormButton from "../../components/form/FormButton";
import vaccination from "../../assets/images/vaccination.png";

const AboutUs = () => {
  return (
    <Base activeKey="aboutUs">
      <div className="main-screen">
        <div className="main-info">
          <div className="info">
            <p>
              VacTrack is an initiative to ease out parenting by helping with keeping track of vaccination
              schedules, reports at one place. It provides a platform where parents can have access to
              vaccination reports of their children and upcoming vaccination schedules at one place.
            </p>
            <p>
              <h3>About Vaccine</h3>
              A biological preparation administrated through various routes such as injection, inhalation or oral, which stimulates immunity against an infectious agent.
              Usually contains a harmless variant of the pathogen e.g
              <br />
              <ul>
                <li>killed or attenuated micro-organism</li>
                <li>lab generated altered form of its toxins</li>
                <li>one of its surface marker.</li>
              </ul>
            </p>
            <div className="text-left">
              <p>
                Follow the link below for immunization schedule
              </p>
              <a href="https://vaccine.icmr.org.in/immunization">Immunization schedule</a>
            </div>
          </div>
        </div>
        <div className="home-vaccine-image">
          <img src={vaccination} alt="Vaccine"></img>
        </div>
      </div>
      {/* <Card className="text-center">
        <Card.Header>About Us</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With the exception of clean, safe drinking water, no human
            endeavor rivals immunization in combating infectious diseases
            and reducing mortality rates. Today, vaccination can prevent
            several infectious diseases, and there are new vaccines on the
            horizon with the potential to prevent even more.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card> */}

    </Base>
  );
};

export default AboutUs;
