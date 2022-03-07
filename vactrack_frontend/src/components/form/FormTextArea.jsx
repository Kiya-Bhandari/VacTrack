import React from "react";
import { Form } from "react-bootstrap";

class FormTextArea extends React.Component {
  render() {
    return (
      <Form.Group className="text-left mb-3">
        {this.props.label && (
          <Form.Label className="fw-bold">{this.props.label}</Form.Label>
        )}

        <Form.Control
          as="textarea"
          onChange={this.props.onChange}
          name={this.props.name}
          placeholder={this.props.placeholder}
          rows={this.props.rows}
        />
      </Form.Group>
    );
  }
}

export default FormTextArea;
