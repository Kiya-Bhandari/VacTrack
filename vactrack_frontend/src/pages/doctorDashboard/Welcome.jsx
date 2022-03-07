import React from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Modal } from "react-bootstrap";

import { userActions } from "../../actions";

import FormContainer from "../../components/form/FormContainer";
import FormText from "../../components/form/FormText";
import FormButton from "../../components/form/FormButton";
import { AddEditDoctor } from "./AddEditDoctor";

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isProfile: false,
      showWelcomeModal: false,
    };
  }

  componentDidMount() {
    this.setState({ showWelcomeModal: true });
  }

  welcomeModal() {
    return (
      <Modal
        show={this.state.showWelcomeModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Welcome to <span style={{ color: "#0d6efd" }}>VacTrack</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            To start using this application ,you need to click{" "}
            <span style={{ fontWeight: "bold" }}>"Go to Profile" </span>
            button below.Your account will be tied to your email address.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <FormButton
            text="Go to Profile"
            type="button"
            onClick={() => {
              this.setState({ isProfile: true, showWelcomeModal: false });
            }}
          ></FormButton>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    return (
      <>
        {this.welcomeModal()}
        {this.state.isProfile && (
          <AddEditDoctor
            isAddDoctorForm="true"
            handleRefresh={this.props.handleRefresh}
          />
        )}
      </>
    );
  }
}

export default Welcome;
