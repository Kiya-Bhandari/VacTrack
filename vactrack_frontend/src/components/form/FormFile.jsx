import React from "react";
import { Form } from "react-bootstrap";

class FormFile extends React.Component {
  render() {
    return (
      <Form.Group className="text-left mb-3">
        <Form.Label className="fw-bold">{this.props.tag}</Form.Label>
        <Form.File
          id={this.props.id}
          type="file"
          label={this.props.label}
          onChange={this.props.onChange}
          custom
          multiple={this.props.multiple}
        />
      </Form.Group>
    );
  }
}

export default FormFile;
