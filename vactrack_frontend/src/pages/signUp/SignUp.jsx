import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { alertActions, userActions, captchaActions } from "../../actions";
import { Form } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import Base from "../../components/common/Base";
import FormContainer from "../../components/form/FormContainer";
import FormText from "../../components/form/FormText";
import FormPassword from "../../components/form/FormPassword";
import FormButton from "../../components/form/FormButton";
import vaccination from "../../assets/images/vaccination.png";
import { errorMessage } from "../../helpers/alert";
import RefreshIcon from "@material-ui/icons/Refresh";
import "../../style/sign.css";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      passwordError: false,
      captcha: "",
      captchaError: false,
      rememberMe: false,
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.handleRefreshCaptcha = this.handleRefreshCaptcha.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // this.props.generateCaptcha("signup");
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleConfirmPassword(e) {
    this.setState({ confirmPassword: e.target.value });
    if (this.state.password !== e.target.value) {
      this.setState({ passwordError: true });
    } else {
      this.setState({ passwordError: false });
    }
  }

  handleRefreshCaptcha() {
    this.props.generateCaptcha("signup");
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { firstName, lastName, email, password, captcha } = this.state;
    if (captcha === this.props.captchaCode) {
      this.setState({ captchaError: false });
      this.props.signup(firstName, lastName, email, password);
    } else {
      this.setState({ captchaError: true });
      this.props.generateCaptcha("signup");
    }
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      passwordError,
      captcha,
      captchaError,
      rememberMe,
      submitted,
    } = this.state;
    return (
      <Base activeKey="signup">
        <div className="main-screen">
          <div className="vaccine-image">
            <img src={vaccination} alt="Vaccine"></img>
          </div>

          <FormContainer className="sign p-3">
            <h4 className="text-center mb-3">Sign Up</h4>
            {this.props.error === true &&
              errorMessage(this.props.error, this.props.errorMessage)}
            <Form onSubmit={this.handleSubmit}>
              <FormText
                placeholder="First Name"
                type="text"
                name="firstName"
                value={firstName}
                onChange={this.handleChange}
                submitted={submitted ? "true" : undefined}
                message="First Name is required"
              />
              <FormText
                placeholder="Last Name"
                type="text"
                name="lastName"
                value={lastName}
                onChange={this.handleChange}
                submitted={submitted ? "true" : undefined}
                message="Last Name is required"
              />

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="tel"
                  placeholder="Contact Number"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  required
                />
              </Form.Group>

              <Row className="mb-3">
                <Col>
                  <FormText
                    placeholder="Otp"
                    name="otp"
                    // value={captcha}
                    onChange={this.handleChange}
                    submitted={submitted ? "true" : undefined}
                    onClick={this.handleRefreshCaptcha}
                    // captchaerror={captchaError ? "true" : undefined}
                  />
                </Col>
                <Col>
                  <FormButton
                    text="Send OTP"
                    type="button"
                    variant="secondary"
                    className="w-100"
                  />
                </Col>
                {/* <FormText
                  placeholder="Captcha"
                  name="captcha"
                  value={captcha}
                  onChange={this.handleChange}
                  submitted={submitted ? "true" : undefined}
                  isInputGroupText="true"
                  inputGroupText={<RefreshIcon />}
                  onClick={this.handleRefreshCaptcha}
                  captchaerror={captchaError ? "true" : undefined}
                />

                <div className="captcha-canvas">
                  <canvas
                    id="signup"
                    className="captcha-code"
                    width="150"
                    height="36"
                  ></canvas>
                </div> */}
              </Row>
              <FormButton text="Confirm" type="submit" className="w-100" />
            </Form>
          </FormContainer>
        </div>
      </Base>
    );
  }
}

function mapState(state) {
  const { registering } = state.registration;
  const { error, errorMessage } = state.alert;
  const { captchaCode, captchaImage } = state.captcha;
  return { registering, error, errorMessage, captchaCode, captchaImage };
}

const actionCreators = {
  signup: userActions.signup,
  generateCaptcha: captchaActions.generateCaptcha,
};

const connectedSignUp = connect(mapState, actionCreators)(SignUp);

export { connectedSignUp as SignUp };
