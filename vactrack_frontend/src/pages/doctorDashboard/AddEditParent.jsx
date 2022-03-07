import React from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Modal } from "react-bootstrap";

import { parentActions } from "../../actions";

import FormContainer from "../../components/form/FormContainer";
import FormText from "../../components/form/FormText";
import FormButton from "../../components/form/FormButton";

class AddEditParent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      submitted: false,
    };
    this.addParentForm = this.addParentForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    console.log("in update");
    if (this.props.parent && this.props.parent !== prevProps.parent) {
      this.setState({
        firstName: this.props.parent.firstName || "",
        lastName: this.props.parent.lastName || "",
        phone: this.props.parent.mobile || "",
        email: this.props.parent.email || "",
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { firstName, lastName, phone, email } = this.state;
    this.setState({ submitted: true });
    if (firstName !== "" && lastName !== "" && phone !== "") {
      if (this.props.isAddParentForm) {
        console.log("add parent");
        this.props.registerParent(firstName, lastName, phone, email, false);
      } else console.log("edit api call");
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  addParentForm() {
    const { firstName, lastName, phone, email, submitted } = this.state;

    return (
      <Modal
        show={this.props.showAddEditForm}
        onHide={this.props.handleCloseAddEditForm}
        className="model dialog"
      >
        <Modal.Header>
          <Modal.Title>
            {this.props.isAddParentForm ? "Add Parent" : "Edit Parent"}
          </Modal.Title>
          <button
            type="button"
            className="btn-close"
            onClick={this.props.handleCloseAddEditForm}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            {/* {this.props.success &&
              this.props.handleSuccess(this.props.successMessage)} */}
            <FormText
              label="First Name"
              name="firstName"
              value={firstName}
              onChange={this.handleChange}
              submitted={submitted ? "true" : undefined}
              message="First Name is required"
            />
            <FormText
              label="Last Name"
              name="lastName"
              value={lastName}
              onChange={this.handleChange}
              submitted={submitted ? "true" : undefined}
              message="Last Name is required"
            />
            <FormText
              label="Contact Number"
              name="phone"
              value={phone}
              onChange={this.handleChange}
              submitted={submitted ? "true" : undefined}
              message="Contact Number is required"
            />
            <FormText
              label="Email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />

            <FormButton
              type="submit"
              text={this.props.isAddParentForm ? "Submit" : "Update"}
            />
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  render() {
    return <>{this.addParentForm()}</>;
  }
}

function mapState(state) {
  const { error, errorMessage, success, successMessage } = state.alert;

  return {
    success,
    successMessage,
  };
}

const actionCreators = {
  registerParent: parentActions.registerParent,
};

const connectedAddEditParent = connect(mapState, actionCreators)(AddEditParent);
export { connectedAddEditParent as AddEditParent };
