import React from "react";
import { Form, InputGroup } from "react-bootstrap";

class FormCheck extends React.Component {
  render() {
    return (
      <Form.Check
        inline={this.props.inline}
        type={this.props.type}
        label={this.props.label}
        value={this.props.value}
        name={this.props.name}
        onChange={this.props.onChange}
        checked={this.props.checked}
        submitted={this.props.submitted}
        className={this.props.className}
      />
    );
  }
}

export default FormCheck;
