import React, { Component } from "react";
import { connect } from "react-redux";

import { parentActions } from "../../actions";

import { Button, Modal, Row, Col, Table, Form } from "react-bootstrap";
import FormButton from "../../components/form/FormButton";

import FormText from "../../components/form/FormText";
import FormTextArea from "../../components/form/FormTextArea";

class SendSmsEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      subject: "",
      email: "",
    };

    this.handleSendSms = this.handleSendSms.bind(this);
    this.handleSendEmail = this.handleSendEmail.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSendSms() {
    this.props.sendSMS(this.props.phoneNumbers, this.state.message);
  }

  handleSendEmail() {
    this.props.sendMail(
      this.state.subject,
      this.state.email,
      this.props.recipientList
    );
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <Modal
        show={this.props.showSmsEmailForm}
        onHide={this.props.handleCloseSmsEmailForm}
        onExited={this.props.handleRefresh}
        className="model dialog"
      >
        <Modal.Header>
          <Modal.Title>{this.props.header}</Modal.Title>
          <button
            type="button"
            className="btn-close"
            onClick={this.props.handleCloseSmsEmailForm}
          ></button>
        </Modal.Header>
        <Modal.Body>
          {this.props.actionValue === "1" ? (
            <>
              <FormTextArea
                label="Message"
                name="message"
                placeholder="Type your message"
                onChange={this.handleChange}
                rows={3}
              />
              <div className="text-center">
                <FormButton
                  text="Send SMS"
                  type="button"
                  onClick={this.handleSendSms}
                />
              </div>
            </>
          ) : (
            <>
              <FormText
                label="Subject"
                name="subject"
                placeholder="Subject"
                onChange={this.handleChange}
              />
              <FormTextArea
                label="Email"
                name="email"
                placeholder="Type your Mail"
                onChange={this.handleChange}
                rows={3}
              />
              <div className="text-center">
                <FormButton text="Send Mail" onClick={this.handleSendEmail} />
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    );
  }
}

function mapState(state) {
  const { parentCount, parents } = state.parent;
  return {
    parentCount,
    parents,
  };
}

const actionCreators = {
  sendSMS: parentActions.sendSMS,
  sendMail: parentActions.sendMail,
};

const connectedSendSmsEmail = connect(mapState, actionCreators)(SendSmsEmail);

export { connectedSendSmsEmail as SendSmsEmail };
