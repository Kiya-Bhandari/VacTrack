import React from "react";
import { Form } from "react-bootstrap";

class FormPassword extends React.Component {
  render() {
    return (
      <Form.Group
        className={
          "text-left mb-3" +
          (this.props.submitted && !this.props.value ? " has-error" : "")
        }
      >
        <Form.Control
          name={this.props.name}
          type={this.props.type}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.onChange}
          submitted={this.props.submitted}
          passworderror={this.props.passworderror}
        />
        <div>
          {this.props.submitted && !this.props.value && (
            <div className="text-danger">{this.props.message}</div>
          )}
          {this.props.passworderror && (
            <div className="text-danger">Password doesn't match</div>
          )}
        </div>
      </Form.Group>
    );
  }
}

export default FormPassword;
