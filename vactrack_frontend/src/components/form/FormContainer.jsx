import React from "react";
import { Card } from "react-bootstrap";

class FormContainer extends React.Component {
  render() {
    return (
      <div className="form-container">
        <Card
          className={`card-width shadow mb-5 bg-body rounded ${this.props.className}`}
        >
          <Card.Body>{this.props.children}</Card.Body>
        </Card>
      </div>
    );
  }
}

export default FormContainer;
