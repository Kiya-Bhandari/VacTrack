import React from "react";
import { Button } from "react-bootstrap";

class FormButton extends React.Component {
  render() {
    return (
      <Button
        variant={this.props.variant}
        type={this.props.type}
        className={`fw-bold ${this.props.className}`}
        size={this.props.size}
        onClick={this.props.onClick}
        block={this.props.block}
      >
        {this.props.text}
      </Button>
    );
  }
}

export default FormButton;
