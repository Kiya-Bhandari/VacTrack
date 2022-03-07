import React from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { Button, Modal, Row, Col, Table } from "react-bootstrap";

import { parentActions, dependentActions } from "../../actions";

import AddCircleIcon from "@material-ui/icons/AddCircle";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import Base from "../../components/common/Base";
import Pagination from "../../components/table/Pagination";
import FormCheck from "../../components/form/FormCheck";
import PositionedSnackbar from "../../components/alert/Snackbar";
import FormSelect from "../../components/form/FormSelect";

import { AddEditParent } from "./AddEditParent";
import { AddEditDoctor } from "./AddEditDoctor";
import Welcome from "./Welcome";
import { SendSmsEmail } from "./SendSmsEmail";

import "./doctorDashboard.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddParentForm: false,
      isEditParentForm: false,
      isAddDoctorForm: false,
      isEditDoctorForm: false,
      showAddEditForm: false,
      showSmsEmailForm: false,
      redirect: false,
      openSnackbar: false,
      actionValue: "",
      page: 1,
      dataPerPage: 10,
      skip: 0,
      isCheckAll: false,
      phoneNumbers: [],
      recipientList: [],
      parent: {},
      refresh: false,
      // selectedParent: [],
    };

    this.handleShowAddEditForm = this.handleShowAddEditForm.bind(this);
    this.handleCloseAddEditForm = this.handleCloseAddEditForm.bind(this);
    this.handleShowSmsEmailForm = this.handleShowSmsEmailForm.bind(this);
    this.handleCloseSmsEmailForm = this.handleCloseSmsEmailForm.bind(this);
    this.showAddEditModal = this.showAddEditModal.bind(this);
    this.onPaginationClicked = this.onPaginationClicked.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleAllCheckBox = this.handleAllCheckBox.bind(this);
    this.handleRedirectDependent = this.handleRedirectDependent.bind(this);
    this.handleDeleteParent = this.handleDeleteParent.bind(this);
    this.handleOpenSnackBar = this.handleOpenSnackBar.bind(this);
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleRow = this.handleRow.bind(this);
  }

  componentDidMount() {
    this.props.getParentByDoctor(this.state.dataPerPage, this.state.skip);
  }

  handleRefresh = () => {
    this.setState({ refresh: true });
  };

  handleShowAddEditForm(value, parent = {}) {
    this.setState({ showAddEditForm: true });
    if (value === "add") {
      this.setState({ isAddParentForm: true, parent: [] });
    } else this.setState({ isEditParentForm: true, parent: parent });
  }

  handleCloseAddEditForm() {
    this.setState({
      showAddEditForm: false,
      isAddParentForm: false,
      isEditParentForm: false,
    });
  }

  handleShowSmsEmailForm() {
    this.setState({
      showSmsEmailForm: true,
    });
  }

  handleCloseSmsEmailForm() {
    this.setState({ showSmsEmailForm: false });
  }

  handleOpenSnackBar() {
    this.setState({ openSnackbar: true });
  }

  handleCloseSnackbar() {
    this.setState({ openSnackbar: false });
  }

  onPaginationClicked(page) {
    let prevPage = page - 1;
    let skip = (page - 1) * this.state.dataPerPage;
    this.setState({ page, skip });
    this.props.getParentByDoctor(this.state.dataPerPage, skip);
  }

  handleCheckBox(e, email) {
    const { name, checked } = e.target;
    this.setState({ phoneNumbers: [...this.state.phoneNumbers, name] });
    if (email !== null) {
      this.setState({ recipientList: [...this.state.recipientList, email] });
    }
    if (!checked) {
      this.setState({
        phoneNumbers: this.state.phoneNumbers.filter((item) => item !== name),
        recipientList: this.state.recipientList.filter(
          (item) => item !== email
        ),
      });
    }
  }

  handleAllCheckBox(e) {
    const { name, checked } = e.target;
    this.setState({
      isCheckAll: !this.state.isCheckAll,
      phoneNumbers: this.state.phoneNumbers.concat(
        this.props.parents.map((parent) => parent.mobile)
      ),
    });
    // if (this.state[name] === true) {
    //   console.log("true");
    //   this.setState({
    //     [name]: false,
    //     phoneNumbers: [],
    //   });
    // } else {
    //   this.setState({
    //     [name]: true,
    //     // isCheckAll: !this.state.isCheckAll,
    //     phoneNumbers: this.state.phoneNumbers.concat(
    //       this.props.parents.map((parent) => parent.mobile)
    //     ),
    //   });
    // }

    // if (this.state.isCheckAll) {
    //   this.setState({
    //     phoneNumbers: [],
    //   });
    // }
  }

  handleChangeActions = (e) => {
    this.setState({ actionValue: e.target.value });
    this.handleShowSmsEmailForm();
  };

  handleRow(parent_id) {
    localStorage.setItem("parentId", parent_id);
    this.setState({
      redirect: true,
      // parent: parent,
    });
  }

  handleRedirectDependent() {
    return <Redirect to="/doctor-dashboard/dependent" />;
  }

  handleDeleteParent(parent) {
    this.setState({ openSnackbar: true, parent: parent });
    this.props.deleteParent(parent.id, this.state.dataPerPage, this.state.skip);
  }

  handleUndo() {
    const { firstName, lastName, mobile, email, isNotify } = this.state.parent;
    console.log("undo:", firstName);
    this.props.undoParent(
      firstName,
      lastName,
      mobile,
      email,
      isNotify,
      this.state.dataPerPage,
      this.state.skip
    );
  }

  showAddEditModal() {
    // const component = () => {
    //   if (this.state.isAddParentForm) {
    return (
      <AddEditParent
        handleCloseAddEditForm={this.handleCloseAddEditForm}
        showAddEditForm={this.state.showAddEditForm}
        isAddParentForm={this.state.isAddParentForm}
        isEditParentForm={this.state.isEditParentForm}
        parent={this.state.parent}
      />
    );
    //   } else {
    //     return (
    //       <AddEditParent
    //         handleCloseAddEditForm={this.handleCloseAddEditForm}
    //         showAddEditForm={this.state.showAddEditForm}
    //         header="Edit Parent"
    //         parent={this.state.parent}
    //         // isAddParentForm={this.state.isAddParentForm}
    //       />
    //     );
    //   }
    // };

    // return component();
  }

  showSmsEmailModal() {
    const component = () => {
      if (this.state.actionValue === "1") {
        return (
          <SendSmsEmail
            handleCloseSmsEmailForm={this.handleCloseSmsEmailForm}
            showSmsEmailForm={this.state.showSmsEmailForm}
            header="Send SMS"
            actionValue={this.state.actionValue}
            phoneNumbers={this.state.phoneNumbers}
          />
        );
      } else {
        return (
          <SendSmsEmail
            handleCloseSmsEmailForm={this.handleCloseSmsEmailForm}
            showSmsEmailForm={this.state.showSmsEmailForm}
            header="Send Email"
            actionValue={this.state.actionValue}
            recipientList={this.state.recipientList}
          />
        );
      }
    };

    return component();
  }

  parentList() {
    const pagination = this.props.parentCount / this.state.dataPerPage > 1 && (
      <Pagination
        numberOfPages={Math.ceil(
          this.props.parentCount / this.state.dataPerPage
        )}
        onPaginationClicked={this.onPaginationClicked}
      />
    );

    return (
      <>
        {/* {localStorage.getItem("firstName") !== "undefined" ||
        localStorage.getItem("email") !== "null" ? ( */}
        <>
          <div className="table-responsive">
            <div className="table-wrapper">
              <div className="table-title">
                <Row>
                  <Col>
                    <h2>Parent List</h2>
                  </Col>
                  <Col>
                    <div style={{ float: "right" }}>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={this.handleChangeActions}
                      >
                        <option disabled selected value="">
                          Actions
                        </option>
                        <option value="1">Send SMS</option>
                        <option value="2">Send Email</option>
                      </select>

                      <a
                        className="btn btn-secondary"
                        onClick={() => this.handleShowAddEditForm("add")}
                      >
                        <AddCircleIcon />
                        <span>Add new Parent</span>
                      </a>
                    </div>
                  </Col>
                </Row>
              </div>
              <Table>
                <thead>
                  <tr>
                    <th>
                      <FormCheck
                        type="checkbox"
                        name={`isCheckAll${this.state.page}`}
                        onChange={this.handleAllCheckBox}
                        checked={this.state.isCheckAll}
                      />
                    </th>
                    <th>Parent Name</th>
                    <th>Contact Number</th>
                    <th>Mail ID</th>
                    <th>Date Created</th>
                    {/* <th></th> */}
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {this.props.parents.length > 0 &&
                    this.props.parents.map((parent) => (
                      <>
                        <tr
                          key={parent.id}
                          className={`parent-info ${
                            this.state.phoneNumbers.includes(parent.mobile)
                              ? ""
                              : ""
                          } ${parent.isNotify ? "highlight-row" : ""}`}
                        >
                          <td>
                            <FormCheck
                              type="checkbox"
                              name={`${parent.mobile}`}
                              onChange={(e) =>
                                this.handleCheckBox(e, parent.email)
                              }
                              checked={this.state.phoneNumbers.includes(
                                parent.mobile
                              )}
                            />
                          </td>
                          <td onClick={() => this.handleRow(parent.id)}>
                            {parent.firstName} {parent.lastName}
                          </td>
                          <td onClick={() => this.handleRow(parent.id)}>
                            {parent.mobile}
                          </td>
                          <td onClick={() => this.handleRow(parent.id)}>
                            {parent.email}
                          </td>
                          <td onClick={() => this.handleRow(parent.id)}>
                            {new Date(parent.createdAt).toLocaleDateString()}
                          </td>
                          {/* <td>
                            {parent.isNotify === true ? (
                              <div className="due-vaccine"></div>
                            ) : null}
                          </td> */}
                          <td>
                            <div className="show-edit-delete">
                              <a
                                onClick={() => {
                                  this.handleShowAddEditForm("edit", parent);
                                }}
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </a>
                              <a
                                onClick={() => this.handleDeleteParent(parent)}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </a>
                            </div>
                          </td>
                        </tr>
                      </>
                    ))}
                </tbody>
              </Table>
              <div className="clearfix">
                <div className="hint-text">
                  {/* Showing <b>{this.state.dataPerPage}</b> out of{" "}
                <b>{this.props.parentCount}</b> entries */}
                </div>
                <div className="pagination"> {pagination}</div>
              </div>
            </div>
          </div>
          {this.showAddEditModal()}
          {this.showSmsEmailModal()}
          {this.state.redirect && this.handleRedirectDependent()}
          <PositionedSnackbar
            openSnackbar={this.state.openSnackbar}
            verticalPosition="bottom"
            horizontalPosition="left"
            message="Parent Deleted"
            handleCloseSnackbar={this.handleCloseSnackbar}
            undo
            handleUndo={this.handleUndo}
          />
          {this.props.success && (
            <PositionedSnackbar
              openSnackbar={this.state.openSnackbar}
              verticalPosition="bottom"
              horizontalPosition="left"
              message={this.props.successMessage}
              handleCloseSnackbar={this.handleCloseSnackbar}
            />
          )}
        </>
        {/* ) : ( */}
        {/* <Welcome /> */}
        {/* )} */}
      </>
    );
  }
  render() {
    return (
      <>
        {localStorage.getItem("firstName") !== "undefined" ||
        localStorage.getItem("email") !== "null" ? (
          <Base activeKey="profile">{this.parentList()}</Base>
        ) : (
          <Welcome handleRefresh={this.handleRefresh} />
        )}
      </>
    );
  }
}

function mapState(state) {
  const { parentCount, parents } = state.parent;
  const { success, successMessage } = state.alert;
  console.log("parents:", state.parent);
  return {
    parentCount,
    parents,
    success,
    successMessage,
  };
}

const actionCreators = {
  getParentByDoctor: parentActions.getParentByDoctor,
  deleteParent: parentActions.deleteParent,
  undoParent: parentActions.undoParent,
};

const connectedDashboard = connect(mapState, actionCreators)(Dashboard);

export { connectedDashboard as Dashboard };
