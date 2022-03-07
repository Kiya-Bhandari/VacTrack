import React from "react";
import { Form } from "react-bootstrap";

class FormDate extends React.Component {
  render() {
    return (
      <Form.Group className="text-left mb-3">
        <Form.Label className="fw-bold">{this.props.label}</Form.Label>
        <Form.Control
          type="date"
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
          submitted={this.props.submitted}
        />
        <div>
          {this.props.submitted && !this.props.value && (
            <div className="text-danger">{this.props.message}</div>
          )}
        </div>
      </Form.Group>
    );
  }
}

export default FormDate;
