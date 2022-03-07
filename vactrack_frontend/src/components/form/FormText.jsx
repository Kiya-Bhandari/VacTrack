import React from "react";
import { Form, InputGroup } from "react-bootstrap";

class FormText extends React.Component {
  render() {
    return (
      <Form.Group
        className={
          "text-left mb-3" +
          (this.props.submitted && !this.props.value ? " has-error" : "")
        }
      >
        {this.props.label && (
          <Form.Label className={`fw-bold ${this.props.visibility}`}>
            {this.props.label}
          </Form.Label>
        )}

        <InputGroup>
          <Form.Control
            name={this.props.name}
            type={this.props.type}
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChange={this.props.onChange}
            plaintext={this.props.plaintext}
            readOnly={this.props.readOnly}
            submitted={this.props.submitted}
          />
          {this.props.isInputGroupText && (
            <InputGroup.Text id="inputGroupText" onClick={this.props.onClick}>
              {this.props.inputGroupText}
            </InputGroup.Text>
          )}
        </InputGroup>
        <div>
          {this.props.submitted && !this.props.value && (
            <div className="text-danger">{this.props.message}</div>
          )}
          {this.props.captchaerror && (
            <div className="text-danger">Not a valid captcha</div>
          )}
        </div>
      </Form.Group>
    );
  }
}

export default FormText;
