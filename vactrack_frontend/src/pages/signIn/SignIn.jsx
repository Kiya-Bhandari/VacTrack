import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  navItemActions,
  alertActions,
  userActions,
  captchaActions,
} from "../../actions";
import { Form, Row, Col, Collapse } from "react-bootstrap";
import PropTypes from "prop-types";
import Base from "../../components/common/Base";
import FormContainer from "../../components/form/FormContainer";
import FormText from "../../components/form/FormText";
import FormPassword from "../../components/form/FormPassword";
import FormCheck from "../../components/form/FormCheck";
import FormButton from "../../components/form/FormButton";
import PositionedSnackbar from "../../components/alert/Snackbar";
import vaccination from "../../assets/images/vaccination.png";
import RefreshIcon from "@material-ui/icons/Refresh";
import { errorMessage, successMessage } from "../../helpers/alert";
import "../../style/sign.css";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.props.logout();

    this.state = {
      phone: "",
      otp: "",
      role: "",
      roleError: false,
      rememberMe: false,
      submitted: false,
      open: false,
      openSnackbar: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleVerifyOtp = this.handleVerifyOtp.bind(this);
    this.handleSendOtp = this.handleSendOtp.bind(this);
    this.handleOpenSnackBar = this.handleOpenSnackBar.bind(this);
    this.handleCloseSnackBar = this.handleCloseSnackBar.bind(this);
  }

  componentDidMount() {
    // this.props.generateCaptcha("signin");
  }

  handleChange(event) {
    const { name, value } = event.target;
    if (this.state.roleError === true && name === "role") {
      this.setState({ roleError: false });
    }
    this.setState({ [name]: value });
  }

  handleVerifyOtp(e) {
    e.preventDefault();
    const { phone, otp, role } = this.state;
    this.setState({ submitted: true });
    if (phone !== "" && otp !== "" && role !== "") {
      this.setState({ submitted: false, openSnackbar: true });
      this.props.verifyOtp(phone, otp, parseInt(role));
    }
  }

  handleSendOtp() {
    this.setState({ submitted: true, roleError: true });
    if (this.state.phone !== "" && this.state.role !== "") {
      let mobileNumber = document.getElementById("mobile-number");
      mobileNumber.style.display = "none";
      this.setState({ open: true, submitted: false, openSnackbar: true });
      this.props.getOtp(this.state.phone);
    }
  }

  handleOpenSnackBar() {
    this.setState({ openSnackbar: true });
  }

  handleCloseSnackBar() {
    this.setState({ openSnackbar: false });
  }

  render() {
    const { phone, otp, role, roleError, submitted } = this.state;

    return (
      <Base activeKey="signin">
        <div className="main-screen">
          <div className="vaccine-image">
            <img src={vaccination} alt="Vaccine"></img>
          </div>

          <FormContainer className="sign p-3">
            <h4 className="text-center mb-3">Sign In</h4>
            <Form onSubmit={this.handleVerifyOtp}>
              <div id="mobile-number">
                {/* <Form.Group className="mb-3">
                  <Form.Control
                    type="tel"
                    placeholder="Contact Number"
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    value={phone}
                    required
                  />
                </Form.Group> */}
                <FormText
                  placeholder="Contact Number"
                  label="Contact Number"
                  name="phone"
                  value={phone}
                  onChange={this.handleChange}
                  message="Contact Number is required"
                  submitted={submitted ? "true" : undefined}
                />
                <Row className="mb-3">
                  <Form.Label className="fw-bold">Select Role</Form.Label>
                  <div>
                    <FormCheck
                      inline={true}
                      type="radio"
                      label="Doctor"
                      value="1"
                      name="role"
                      onChange={this.handleChange}
                    />
                    <FormCheck
                      inline={true}
                      type="radio"
                      label="Parent"
                      value="2"
                      name="role"
                      onChange={this.handleChange}
                    />
                  </div>

                  {roleError ? (
                    <span className="text-danger">Role is required</span>
                  ) : null}
                </Row>
                <FormButton
                  text="Send OTP"
                  className="w-100"
                  type="button"
                  onClick={this.handleSendOtp}
                />
              </div>
              <div id="verify-otp">
                <Collapse in={this.state.open} dimension="width">
                  <div>
                    <FormText
                      label="Enter OTP"
                      placeholder="OTP"
                      name="otp"
                      value={otp}
                      onChange={this.handleChange}
                      message="OTP is required"
                      submitted={submitted ? "true" : undefined}
                    />

                    <FormButton
                      text="Verfiy OTP"
                      className="w-100"
                      type="submit"
                    />
                    <Row>
                      <Col></Col>
                      <Col
                        style={{ textAlignLast: "right", cursor: "pointer" }}
                        onClick={() => this.props.getOtp(this.state.phone)}
                      >
                        Resend OTP
                      </Col>
                    </Row>
                  </div>
                </Collapse>
              </div>
            </Form>
          </FormContainer>
        </div>
        {this.props.otpSuccessMessage && (
          <PositionedSnackbar
            horizontalPosition="right"
            verticalPosition="top"
            message={this.props.otpSuccessMessage}
            openSnackbar={this.state.openSnackbar}
            handleCloseSnackbar={this.handleCloseSnackBar}
          />
        )}

        {this.props.otpErrorMessage && (
          <PositionedSnackbar
            horizontalPosition="right"
            verticalPosition="top"
            message={this.props.otpErrorMessage}
            openSnackbar={this.state.openSnackbar}
            handleCloseSnackbar={this.handleCloseSnackBar}
          />
        )}

        {this.props.otpVerifyErrorMessage && (
          <PositionedSnackbar
            horizontalPosition="right"
            verticalPosition="top"
            message={this.props.otpVerifyErrorMessage}
            openSnackbar={this.state.openSnackbar}
            handleCloseSnackbar={this.handleCloseSnackBar}
          />
        )}
      </Base>
    );
  }
}

function mapState(state) {
  const { loggingIn } = state.authentication;
  const { otpSuccessMessage, otpErrorMessage, otpVerifyErrorMessage } =
    state.users;
  return {
    loggingIn,
    otpSuccessMessage,
    otpErrorMessage,
    otpVerifyErrorMessage,
  };
}

const actionCreators = {
  // login: userActions.login,
  logout: userActions.logout,
  getOtp: userActions.getOtp,
  verifyOtp: userActions.verifyOtp,
  authenticatedNavItem: navItemActions.authenticatedNavItem,
};

const connectedSignIn = connect(mapState, actionCreators)(SignIn);
export { connectedSignIn as SignIn };
