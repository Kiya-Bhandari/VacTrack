import React, { Component } from "react";
import { connect } from "react-redux";
import { dependentActions, vaccineActions } from "../../actions";

import {
  Figure,
  Row,
  Col,
  Form,
  Card,
  Image,
  Table,
  Collapse,
} from "react-bootstrap";

import Base from "../../components/common/Base";
import FormContainer from "../../components/form/FormContainer";
import FormFile from "../../components/form/FormFile";
import FormText from "../../components/form/FormText";
import FormDate from "../../components/form/FormDate";
import FormSelect from "../../components/form/FormSelect";
import FormButton from "../../components/form/FormButton";

import kid from "../../assets/images/kid-2.png";
import user from "../../assets/images/user.png";
import editIcon from "../../assets/images/edit.png";

import AddCircleIcon from "@material-ui/icons/AddCircle";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AddVaccine } from "./AddVaccine";

class DependentDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dependentDetails: {},
      vaccineSchedule: [],
    };
  }

  componentDidMount() {
    this.setState({
      dependentDetails: this.props.location.state.dependent,
      // vaccineSchedule: this.props.location.state.dependent.vaccineSchedule,
    });
    this.props.getAllVaccine();
    this.props.getAllVaccineStatus();
    this.props.getDependentById(
      parseInt(this.props.location.state.dependent.id)
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.vaccineSchedule !== prevProps.vaccineSchedule) {
      this.setState({ vaccineSchedule: this.props.vaccineSchedule });
    }
  }

  updatePersonalDetail = (newBook) => {
    console.log("update personal detail");
  };

  updateVaccinationDetail = (updateVaccinationDetail) => {
    console.log("update vaccination detail :", updateVaccinationDetail);
    updateVaccinationDetail.forEach((detail) => {
      let vacScheduleId = detail[0];
      let status,
        doseDateTime = "";
      if (detail[1].length === 1) {
        if (/^[0-9]+$/.test(detail[1][0])) {
          console.log("status");
          status = detail[1][0];
        } else doseDateTime = detail[1][0];
      } else {
        console.log("both");
        status = detail[1][1];
        doseDateTime = detail[1][0];
      }
      console.log("status,dt:", status, doseDateTime);

      this.props.updateDependentVaccine(
        {
          id: vacScheduleId,
          status: status,
          doseDateTime: doseDateTime,
        },
        this.state.dependentDetails["id"]
      );
    });
  };

  deleteBook = (bookId) => {
    fetch(`http://localhost:8000/api/books/${bookId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      this.setState({
        books: this.state.books.filter((book) => book.id !== bookId),
      });
    });
  };

  render() {
    return (
      <Base>
        <div className="dependent-detail">
          <FormContainer>
            <EditableDetail
              dependentDetails={this.state.dependentDetails}
              vaccineSchedule={this.state.vaccineSchedule}
              onDeleteClick={this.onDeleteClick}
              updatePersonalDetail={this.updatePersonalDetail}
              updateVaccinationDetail={this.updateVaccinationDetail}
              vaccineCategory={this.props.vaccineCategory}
              vaccineStatus={this.props.vaccineStatus}
            ></EditableDetail>
          </FormContainer>
        </div>
      </Base>
    );
  }
}

class EditableDetail extends React.Component {
  state = {
    inEditModePersonal: false,
    inEditModeVaccination: false,
  };

  enterEditModePersonal = () => {
    this.setState({ inEditModePersonal: true });
  };

  leaveEditModePersonal = () => {
    this.setState({ inEditModePersonal: false });
  };

  enterEditModeVaccination = () => {
    this.setState({ inEditModeVaccination: true });
  };

  leaveEditModeVacciation = () => {
    this.setState({ inEditModeVaccination: false });
  };

  handleDelete = () => {
    this.props.onDeleteClick(this.props.id);
  };

  handlePersonalDetailUpdate = (book) => {
    this.leaveEditModePersonal();
    // book.id = this.props.id;
    this.props.updatePersonalDetail(book);
  };

  handleVaccinationUpdate = (updateVaccinationDetail) => {
    this.leaveEditModeVacciation();
    // book.id = this.props.id;
    this.props.updateVaccinationDetail(updateVaccinationDetail);
  };

  render() {
    const component = () => {
      if (this.state.inEditModeVaccination && this.state.inEditModePersonal) {
        return (
          <>
            <PersonalDetailForm
              dependentDetails={this.props.dependentDetails}
              onCancelClick={this.leaveEditModePersonal}
              onFormSubmit={this.handlePersonalDetailUpdate}
            />
            <VaccinationDetailForm
              vaccineSchedule={this.props.vaccineSchedule}
              onCancelClick={this.leaveEditModeVacciation}
              onFormSubmit={this.handleVaccinationUpdate}
            />
          </>
        );
      }
      if (this.state.inEditModePersonal) {
        return (
          <>
            <PersonalDetailForm
              dependentDetails={this.props.dependentDetails}
              onCancelClick={this.leaveEditModePersonal}
              onFormSubmit={this.handlePersonalDetailUpdate}
            />
            <VaccinationDetail
              dependentId={this.props.dependentDetails.id}
              vaccineSchedule={this.props.vaccineSchedule}
              vaccineCategory={this.props.vaccineCategory}
              vaccineStatus={this.props.vaccineStatus}
              onEditClick={this.enterEditModeVaccination}
              onDeleteClick={this.handleDelete}
            />
          </>
        );
      }
      if (this.state.inEditModeVaccination) {
        return (
          <>
            <PersonalDetail
              dependentDetails={this.props.dependentDetails}
              onEditClick={this.enterEditModePersonal}
              onDeleteClick={this.handleDelete}
            />
            <VaccinationDetailForm
              vaccineSchedule={this.props.vaccineSchedule}
              onCancelClick={this.leaveEditModeVacciation}
              onFormSubmit={this.handleVaccinationUpdate}
            />
          </>
        );
      }

      return (
        <>
          <PersonalDetail
            dependentDetails={this.props.dependentDetails}
            onEditClick={this.enterEditModePersonal}
            onDeleteClick={this.handleDelete}
          />
          <VaccinationDetail
            dependentId={this.props.dependentDetails.id}
            vaccineSchedule={this.props.vaccineSchedule}
            vaccineCategory={this.props.vaccineCategory}
            vaccineStatus={this.props.vaccineStatus}
            onEditClick={this.enterEditModeVaccination}
            onDeleteClick={this.handleDelete}
          />
        </>
      );
    };
    return <> {component()}</>;
  }
}

class PersonalDetailForm extends React.Component {
  state = {
    firstName: this.props.dependentDetails.firstName || "",
    lastName: this.props.dependentDetails.lastName || "",
    bloodGroup: this.props.dependentDetails.bloodGroup || "",
    dob: this.props.dependentDetails.dob || "",
    submitted: false,
  };

  handlePersonalDetailForm = (evt) => {
    evt.preventDefault();
    this.props.onFormSubmit({ ...this.state });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  photoUpload = (e) => {
    console.log("hii");
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
  };

  render() {
    // const buttonText = this.props.id ? "Update Book" : "Create Book";
    const { firstName, lastName, bloodGroup, dob, imageUrl } = this.state;
    const { submitted } = this.state;
    return (
      <Card className="mb-3">
        <Card.Header className="fw-bold d-flex justify-content-between">
          <span>Personal Details</span>
        </Card.Header>
        <Form onSubmit={this.handlePersonalDetailForm}>
          <Card.Body className="show-personal-details">
            <div>
              <label>
                <Figure style={{ textAlign: "center" }}>
                  <Figure.Image
                    src={imageUrl ? imageUrl : user}
                    className="profile-photo dashboard-image"
                    roundedCircle
                  />
                  <div style={{ display: "none" }}>
                    <FormFile onChange={this.photoUpload} />
                  </div>
                </Figure>
              </label>
            </div>
            <div>
              <Row>
                <Col>
                  <FormText
                    label="Child's Name"
                    name="firstName"
                    value={firstName}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col>
                  <FormText
                    label="Child's Name"
                    visibility="invisible"
                    name="lastName"
                    value={lastName}
                    onChange={this.handleChange}
                  />
                </Col>
              </Row>

              <Row style={{ marginTop: "3px" }}>
                <Col>
                  <FormDate
                    label="Date of Birth"
                    value={dob}
                    name="dob"
                    onChange={this.handleChange}
                  />
                </Col>
                <Col>
                  <FormText
                    label="Blood Group"
                    value={bloodGroup}
                    name="bloodGroup"
                    onChange={this.handleChange}
                  />
                </Col>
              </Row>
            </div>
          </Card.Body>
          <div className="text-center mb-3">
            <FormButton type="submit" text="Update" className="me-3" />
            <FormButton
              onClick={this.props.onCancelClick}
              text="Cancel"
              variant="secondary"
            />
          </div>
        </Form>
      </Card>
    );
  }
}

class VaccinationDetailForm extends React.Component {
  state = {
    submitted: false,
    // title: this.props.title || "",
    // author: this.props.author || "",
    // description: this.props.description || "",
    // dependentDetail: this.props.dependentDetail,
  };

  handleVaccinationDetailForm = (evt) => {
    evt.preventDefault();
    // console.log("vacc:", Object.entries(this.state).slice(0, -1));
    this.props.onFormSubmit(Object.entries(this.state).slice(0, -1));
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    console.log("value:", value);
    let splitName = name.split(" ");
    console.log("split:", splitName);
    let storeKey = splitName[0];
    if (!(storeKey in this.state)) {
      let valueDT = [];
      if (splitName[1][0] === "d") {
        valueDT.splice(0, 0, value);
        this.setState({
          [storeKey]: valueDT,
        });
      } else {
        valueDT.splice(1, 0, value);
        this.setState({
          [storeKey]: valueDT,
        });
      }
    } else {
      let stateValue = this.state[storeKey];
      if (splitName[1][0] === "d") {
        if (stateValue.length === 2 || !/^[a-zA-Z]+$/.test(stateValue[0])) {
          stateValue.splice(0, 1, value);
        } else {
          stateValue.unshift(value);
        }

        this.setState({
          [storeKey]: stateValue,
        });
      } else {
        stateValue.splice(1, 1, value);
        this.setState({
          [storeKey]: stateValue,
        });
      }
    }
  };

  render() {
    return (
      <Card>
        <Card.Header className="fw-bold d-flex justify-content-between">
          <span>Vaccination Details</span>

          <div>
            <span onClick={this.props.onEditClick} className="me-2">
              <FontAwesomeIcon icon={faEdit} />
            </span>

            <span onClick={this.props.onDeleteClick}>
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </div>
        </Card.Header>
        <Form onSubmit={this.handleVaccinationDetailForm}>
          <Card.Body className="show-personal-details">
            <Table responsive>
              <thead>
                <tr>
                  <th>Vaccine Name</th>
                  <th>Dose Number</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {this.props.vaccineSchedule.length > 0 &&
                  this.props.vaccineSchedule.map((schedule) => (
                    <tr key={schedule.id}>
                      <td>{schedule.vaccineId.name}</td>
                      <td>{schedule.doseNumber}</td>
                      <td>
                        <input
                          type="datetime-local"
                          name={`${schedule.id} datetime`}
                          onChange={this.handleChange}
                          value={schedule.doseDatetime.slice(0, 16)}
                        ></input>
                        {/* {schedule.doseDatetime.slice(0, 16)} */}
                      </td>
                      <td>
                        <FormSelect
                          onChange={this.handleChange}
                          name={`${schedule.id} status`}
                          value={schedule.status}
                        >
                          <option value="SCHEDULED">Scheduled</option>
                          <option value="MISSED">Missed</option>
                          <option value="DONE">Done</option>
                          <option value="NOT DONE">Not Done</option>
                        </FormSelect>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Card.Body>
          <div className="text-center mb-3">
            <FormButton type="submit" text="Update" className="me-3" />
            <FormButton
              onClick={this.props.onCancelClick}
              text="Cancel"
              variant="secondary"
            />
          </div>
        </Form>
      </Card>
    );
  }
}

class PersonalDetail extends React.Component {
  render() {
    const { firstName, lastName, bloodGroup, dob, imageUrl } =
      this.props.dependentDetails;
    return (
      <>
        <Card className="mb-3">
          <Card.Header className="fw-bold d-flex justify-content-between">
            <span>Personal Details</span>
            <div>
              <span onClick={this.props.onEditClick} className="me-2">
                <FontAwesomeIcon icon={faEdit} />
              </span>
              <span onClick={this.props.onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </div>
          </Card.Header>
          <Card.Body className="show-personal-details">
            <div>
              <Figure style={{ textAlign: "center" }}>
                <Figure.Image
                  src={imageUrl ? imageUrl : user}
                  className="profile-photo dashboard-image"
                  roundedCircle
                />
              </Figure>
            </div>
            <div>
              <Row>
                <Col>
                  <FormText
                    label="Child's Name"
                    value={firstName}
                    readOnly={true}
                  />
                </Col>
                <Col>
                  <FormText
                    label="Child's Name"
                    visibility="invisible"
                    value={lastName}
                    readOnly={true}
                  />
                </Col>
              </Row>

              <Row style={{ marginTop: "3px" }}>
                <Col>
                  <FormDate label="Date of Birth" value={dob} readOnly={true} />
                </Col>
                <Col>
                  <FormText
                    label="Blood Group"
                    value={bloodGroup}
                    readOnly={true}
                  />
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>
      </>
    );
  }
}

class VaccinationDetail extends React.Component {
  state = {
    openVaccineList: false,
  };
  render() {
    return (
      <Card>
        <Card.Header className="fw-bold d-flex justify-content-between">
          <span>Vaccination Details</span>

          <div>
            <span onClick={this.props.onEditClick} className="me-2">
              <FontAwesomeIcon icon={faEdit} />
            </span>
            <span onClick={this.props.onDeleteClick}>
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </div>
        </Card.Header>
        <Card.Body className="show-vaccination-details">
          <Table responsive>
            <thead>
              <tr>
                <th>Vaccine Name</th>
                <th>Dose Number</th>
                <th>Date & Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {this.props.vaccineSchedule.length > 0 &&
                this.props.vaccineSchedule.map((schedule) => (
                  <tr key={schedule.id}>
                    <td>{schedule.vaccineId.name}</td>
                    <td>{schedule.doseNumber}</td>
                    <td>
                      {new Date(schedule.doseDatetime).toLocaleDateString()}{" "}
                      {new Date(schedule.doseDatetime).toLocaleTimeString()}
                    </td>
                    <td>{schedule.statusId.status}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <div className="text-center">
            <a
              className="btn btn-secondary"
              onClick={() =>
                this.setState({ openVaccineList: !this.state.openVaccineList })
              }
            >
              <AddCircleIcon />
              <span>Schedule Other Vaccines</span>
            </a>
          </div>
          <Collapse in={this.state.openVaccineList}>
            <div id="example-collapse-text" className="mt-3">
              <AddVaccine
                vaccineCategory={this.props.vaccineCategory}
                vaccineStatus={this.props.vaccineStatus}
                depId={this.props.dependentId}
              />
            </div>
          </Collapse>
        </Card.Body>
      </Card>
    );
  }
}

function mapState(state) {
  const { userID } = state.users;
  const { vaccines, vaccineStatus } = state.vaccine;
  const { vaccineSchedule } = state.dependent;

  return {
    userID,
    vaccineCategory: vaccines,
    vaccineSchedule,
    vaccineStatus,
  };
}

const actionCreators = {
  updateDependentVaccine: dependentActions.updateDependentVaccine,
  getAllVaccine: vaccineActions.getAllVaccine,
  getAllVaccineStatus: vaccineActions.getAllVaccineStatus,
  getDependentById: dependentActions.getDependentById,
};

const connectedDependentDetail = connect(
  mapState,
  actionCreators
)(DependentDetail);

export { connectedDependentDetail as DependentDetail };
