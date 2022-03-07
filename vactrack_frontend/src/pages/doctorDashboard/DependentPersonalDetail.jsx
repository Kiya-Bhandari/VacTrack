import React, { Component } from "react";
import { Row, Col, Form, Figure, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { dependentActions, vaccineActions } from "../../actions";
import FormText from "../../components/form/FormText";
import FormCheck from "../../components/form/FormCheck";
import FormDate from "../../components/form/FormDate";
import FormFile from "../../components/form/FormFile";
import FormButton from "../../components/form/FormButton";
import FormContainer from "../../components/form/FormContainer";
import user from "../../assets/images/user.png";

class DependentPersonalDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreviewUrl: "",
      firstName: "",
      lastName: "",
      gender: "",
      genderError: "",
      dob: "",
      bloodGroup: "",
      submitted: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addPersonalDetails = this.addPersonalDetails.bind(this);
    this.photoUpload = this.photoUpload.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { firstName, lastName, gender, dob, bloodGroup, imagePreviewUrl } =
      this.state;
    let dependentData = {
      parentId: this.props.parentId,
      firstName,
      lastName,
      gender,
      dob,
      bloodGroup,
      imagePreviewUrl,
    };
    if (this.state.gender === "") {
      this.setState({ genderError: true });
    } else {
      this.setState({ genderError: false });
      console.log("api call");
      this.props.registerDependent(dependentData);
      this.props.nextPage();
    }
  }

  photoUpload(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  addPersonalDetails() {
    const {
      firstName,
      lastName,
      gender,
      genderError,
      dob,
      bloodGroup,
      submitted,
    } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="personal-details">
          <Figure style={{ textAlign: "center" }}>
            <label>
              <Image
                src={
                  this.state.imagePreviewUrl ? this.state.imagePreviewUrl : user
                }
                roundedCircle
                className=" profile-photo dashboard-image"
              />
              <div style={{ display: "none" }}>
                <FormFile onChange={this.photoUpload} />
              </div>
            </label>
          </Figure>

          <Row>
            <Col>
              <FormText
                label="Child's Name"
                placeholder="First Name"
                name="firstName"
                value={firstName}
                onChange={this.handleChange}
                submitted={submitted ? "true" : undefined}
                message="First Name is required"
              />
            </Col>
            <Col>
              <FormText
                placeholder="Last Name"
                label="Child's Name"
                visibility="invisible"
                name="lastName"
                value={lastName}
                onChange={this.handleChange}
                submitted={submitted ? "true" : undefined}
                message="Last Name is required"
              />
            </Col>
          </Row>

          <Row style={{ marginTop: "3px" }}>
            <Col>
              <FormDate
                name="dob"
                label="Date of Birth"
                value={dob}
                onChange={this.handleChange}
                submitted={submitted ? "true" : undefined}
                message="Date of Birth is required"
              />
            </Col>
            <Col>
              <FormText
                label="Blood Group"
                name="bloodGroup"
                value={bloodGroup}
                onChange={this.handleChange}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Label className="fw-bold">Gender</Form.Label>
            <div>
              <FormCheck
                inline={true}
                type="radio"
                label="Male"
                value="MALE"
                name="gender"
                onChange={this.handleChange}
              />
              <FormCheck
                inline={true}
                type="radio"
                label="Female"
                value="FEMALE"
                name="gender"
                onChange={this.handleChange}
              />
              <FormCheck
                inline={true}
                type="radio"
                label="Other"
                value="OTHER"
                name="gender"
                onChange={this.handleChange}
              />
            </div>
            <div>
              {genderError ? (
                <span className="text-danger">Gender is required</span>
              ) : null}
            </div>
          </Row>
        </div>
        <div className="text-center">
          <FormButton type="submit" text="Save & Continue" size="md" />
        </div>
      </Form>
    );
  }

  render() {
    return <>{this.addPersonalDetails()}</>;
  }
}

function mapState(state) {
  const { userID } = state.users;
  const { vaccines } = state.vaccine;

  return {
    userID,
    vaccineCategory: vaccines,
  };
}

const actionCreators = {
  registerDependent: dependentActions.registerDependent,
};

const connectedDependentPersonalDetail = connect(
  mapState,
  actionCreators
)(DependentPersonalDetail);

export { connectedDependentPersonalDetail as DependentPersonalDetail };
