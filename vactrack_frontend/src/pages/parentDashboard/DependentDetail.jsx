import React from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  Row,
  Col,
  Table,
  Form,
  Card,
  Accordion,
} from "react-bootstrap";

import { parentActions, dependentActions } from "../../actions";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import Base from "../../components/common/Base";
import Pagination from "../../components/table/Pagination";
import FormCheck from "../../components/form/FormCheck";
import PositionedSnackbar from "../../components/alert/Snackbar";
import FormSelect from "../../components/form/FormSelect";
import {
  generateCertificate,
  generateReport,
} from "../../services/generateCertificate";
import certificate from "../../assets/images/certificate.svg";
import dosecomplete from "../../assets/images/dosecomplete.svg";
import doseschedule from "../../assets/images/doseschedule.jpg";
import jsPDF from "jspdf";

import "../doctorDashboard/doctorDashboard.css";

class DependentDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      dataPerPage: 10,
      skip: 0,
      previous: "",
      current: "",
    };
  }

  componentDidMount() {
    this.props.getDependentById(
      parseInt(this.props.location.state.dependent.id)
    );
  }

  handleClick(key) {
    this.setState({ previous: this.state.current, current: key });
    let previous = this.state.current;

    let getPlus = document.getElementById(`plus ${key}`);
    let getMinus = document.getElementById(`minus ${key}`);

    if (getPlus.style.display === "inline-block") {
      getPlus.style.display = "none";
      getMinus.style.display = "inline-block";
    } else {
      getPlus.style.display = "inline-block";
      getMinus.style.display = "none";
    }

    if (previous != "" && previous !== key) {
      let getPreviousPlus = document.getElementById(`plus ${previous}`);
      let getPreviousMinus = document.getElementById(`minus ${previous}`);
      getPreviousPlus.style.display = "inline-block";
      getPreviousMinus.style.display = "none";
    }
  }

  handleVaccineDetail = (vaccineId) => {
    let vaccineDetail = this.props.vaccineSchedule.filter(
      (vaccine) =>
        vaccine.vaccineId.id === vaccineId && vaccine.statusId.id === "2"
    );
    return vaccineDetail;
  };

  dependentVaccineList() {
    // const pagination = this.props.parentCount / this.state.dataPerPage > 1 && (
    //   <Pagination
    //     numberOfPages={Math.ceil(
    //       this.props.parentCount / this.state.dataPerPage
    //     )}
    //     onPaginationClicked={this.onPaginationClicked}
    //   />
    // );
    // var t = this.props.vaccineSchedule;
    var vaccineTaken = [];

    this.props.vaccineSchedule.filter(function (item) {
      var i = vaccineTaken.findIndex(
        (x) => x.name == item.vaccineId.name && x.id == item.vaccineId.id
      );
      if (i <= -1) {
        vaccineTaken.push(item.vaccineId);
      }

      return null;
    });

    return (
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <Row>
              <Col>
                <h2>Dependent Vaccine List</h2>
              </Col>
              {vaccineTaken.length !== 0 || this.props.vaccineSchedule !== 0 ? (
                <Col>
                  <div style={{ float: "right" }}>
                    <a
                      onClick={() => {
                        generateReport(
                          this.props.location.state.dependent,
                          vaccineTaken,
                          this.props.vaccineSchedule
                        );
                      }}
                      className="certificate"
                    >
                      <span>Vaccination Report</span>
                    </a>
                  </div>
                </Col>
              ) : null}
            </Row>
          </div>
          <Table>
            <Accordion>
              {vaccineTaken.length > 0 &&
                vaccineTaken.map((item) => (
                  <Card className="category" key={item.id}>
                    <Accordion.Toggle
                      as={Card.Header}
                      eventKey={item.id}
                      className="fw-bold card-header"
                      onClick={() => {
                        this.handleClick(item.id);
                      }}
                    >
                      {item.name}
                      <span className="d-flex align-items-center">
                        {this.props.vaccineSchedule.filter(
                          (vaccine) =>
                            vaccine.vaccineId.id === item.id &&
                            vaccine.statusId.id === "2"
                        ).length !== 0 ? (
                          <a
                            onClick={() =>
                              generateCertificate(
                                this.props.location.state.dependent,
                                this.handleVaccineDetail(item.id)
                              )
                            }
                            className="certificate"
                          >
                            <img
                              src={certificate}
                              className="certificate-icon"
                            />
                            <span>Certificate</span>
                          </a>
                        ) : null}
                        <span
                          id={`plus ${item.id}`}
                          style={{ display: "inline-block" }}
                        >
                          <AddIcon />
                        </span>
                        <span
                          id={`minus ${item.id}`}
                          style={{ display: "none" }}
                        >
                          <RemoveIcon />
                        </span>
                      </span>
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey={item.id}>
                      <Card.Body>
                        {this.props.vaccineSchedule
                          .filter((vaccine) => vaccine.vaccineId.id === item.id)
                          .map((detail, index, arr) => {
                            if (arr.length - 1 === index) {
                              return (
                                <>
                                  <p className="d-flex">
                                    <span className="fw-bold d-flex align-items-center">
                                      {detail.statusId.id === "2" ? (
                                        <img
                                          src={dosecomplete}
                                          className="me-1"
                                        />
                                      ) : (
                                        ""
                                        // <img
                                        //   src={doseschedule}
                                        //   className="me-1 doseschedule-img"
                                        // />
                                      )}
                                      Dose {detail.doseNumber}
                                    </span>
                                    <span>
                                      |
                                      {new Date(
                                        detail.doseDatetime
                                      ).toLocaleDateString("en-us", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                      })}
                                    </span>
                                  </p>
                                </>
                              );
                            } else {
                              return (
                                <>
                                  <p className="d-flex">
                                    <span className="fw-bold d-flex align-items-center">
                                      {detail.statusId.id === "2" ? (
                                        <img
                                          src={dosecomplete}
                                          className="me-1"
                                        />
                                      ) : (
                                        ""
                                        // <img
                                        //   src={doseschedule}
                                        //   className="me-1 doseschedule-img"
                                        // />
                                      )}
                                      Dose {detail.doseNumber}
                                    </span>
                                    <span>
                                      |
                                      {new Date(
                                        detail.doseDatetime
                                      ).toLocaleDateString("en-us", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                      })}
                                    </span>
                                  </p>

                                  <hr></hr>
                                </>
                              );
                            }
                          })}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))}
            </Accordion>

            {/* <thead>
              <tr></tr>
            </thead>

            <tbody></tbody> */}
          </Table>
          <div className="clearfix">
            <div className="hint-text">
              {/* Showing <b>{this.state.dataPerPage}</b> out of{" "}
                <b>{this.props.parentCount}</b> entries */}
            </div>
            <div className="pagination"></div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return <Base activeKey="profile">{this.dependentVaccineList()}</Base>;
  }
}

function mapState(state) {
  const { vaccineSchedule } = state.dependent;

  return {
    vaccineSchedule,
  };
}

const actionCreators = {
  getDependentById: dependentActions.getDependentById,
};

const connectedDependentDetail = connect(
  mapState,
  actionCreators
)(DependentDetail);

export { connectedDependentDetail as DependentDetail };
