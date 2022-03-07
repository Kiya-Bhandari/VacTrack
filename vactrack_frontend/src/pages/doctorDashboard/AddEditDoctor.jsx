import React from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Modal } from "react-bootstrap";

import { userActions } from "../../actions";

import FormContainer from "../../components/form/FormContainer";
import FormText from "../../components/form/FormText";
import FormButton from "../../components/form/FormButton";

class AddEditDoctor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      submitted: false,
      showAddEditForm: false,
    };
    this.addDoctorForm = this.addDoctorForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    console.log("in update");
    if (this.props.doctor && this.props.doctor !== prevProps.doctor) {
      this.setState({
        firstName: this.props.doctor.firstName || "",
        lastName: this.props.doctor.lastName || "",
        email: this.props.doctor.email || "",
      });
    }
  }

  componentDidMount() {
    this.setState({
      showAddEditForm: true,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ showAddEditForm: false });
    const { firstName, lastName, email } = this.state;
    this.setState({ submitted: true });
    if (firstName !== "" && lastName !== "" && email !== "") {
      if (this.props.isAddDoctorForm) {
        console.log("add doctor");
        this.props.handleRefresh();
        this.props.registerDoctorProfile(firstName, lastName, email);
      } else console.log("edit api call");
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  addDoctorForm() {
    const { firstName, lastName, email, submitted } = this.state;

    return (
      <Modal
        show={this.state.showAddEditForm}
        className="model dialog"
        centered
      >
        <Modal.Header>
          <Modal.Title>
            {this.props.isAddDoctorForm
              ? "Add Personal Detail"
              : "Edit Personal Detail"}
          </Modal.Title>
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
              label="Email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            <FormButton
              type="submit"
              text={this.props.isAddDoctorForm ? "Submit" : "Update"}
            />
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  render() {
    return <>{this.addDoctorForm()}</>;
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
  registerDoctorProfile: userActions.registerDoctorProfile,
};

const connectedAddEditDoctor = connect(mapState, actionCreators)(AddEditDoctor);
export { connectedAddEditDoctor as AddEditDoctor };
