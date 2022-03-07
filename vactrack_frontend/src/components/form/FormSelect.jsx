import React from "react";
import { Form } from "react-bootstrap";

class FormSelect extends React.Component {
  render() {
    return (
      <Form.Group className="text-left">
        {this.props.label && (
          <Form.Label className="fw-bold">{this.props.label}</Form.Label>
        )}

        <Form.Control
          as="select"
          onChange={this.props.onChange}
          name={this.props.name}
          placeholder={this.props.placeholder}
        >
          {this.props.children}
        </Form.Control>
      </Form.Group>
    );
  }
}

export default FormSelect;
