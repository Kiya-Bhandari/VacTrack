import React, { Component } from "react";
import { connect } from "react-redux";
import { dependentActions, vaccineActions } from "../../actions";
import Base from "../../components/common/Base";
import { Container, Tabs, Tab, Image, Figure } from "react-bootstrap";
import { AddVaccine } from "./AddVaccine";
import { DependentPersonalDetail } from "./DependentPersonalDetail";

class AddDependent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "1",
      test: "hii",
    };
    this.nextPage = this.nextPage.bind(this);
  }

  componentDidMount() {
    this.props.getAllVaccine();
    this.props.getAllVaccineStatus();
    // this.setState({ key: localStorage.getItem("key") });
  }

  nextPage() {
    // localStorage.setItem("key", (parseInt(this.state.key) + 1).toString());
    this.setState({ key: (parseInt(this.state.key) + 1).toString() });
  }

  addDependentForm() {
    return (
      <Container>
        <Tabs
          id="controlled-tab-example"
          activeKey={this.state.key}
          onSelect={(k) => this.setState({ key: k })}
          className="mb-3 add-dependent"
        >
          <Tab eventKey="1" title="Personal Details">
            <DependentPersonalDetail
              parentId={localStorage.getItem("parentId")}
              nextPage={this.nextPage}
            />
          </Tab>

          <Tab eventKey="2" title="Add Vaccines">
            <AddVaccine
              vaccineCategory={this.props.vaccineCategory}
              vaccineStatus={this.props.vaccineStatus}
              addDependent="true"
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
  render() {
    return <Base>{this.addDependentForm()}</Base>;
  }
}

function mapState(state) {
  const { userID } = state.users;
  const { vaccines, vaccineStatus } = state.vaccine;

  return {
    userID,
    vaccineCategory: vaccines,
    vaccineStatus,
  };
}

const actionCreators = {
  registerDependent: dependentActions.registerDependent,
  getAllVaccine: vaccineActions.getAllVaccine,
  getAllVaccineStatus: vaccineActions.getAllVaccineStatus,
};

const connectedAddDependent = connect(mapState, actionCreators)(AddDependent);

export { connectedAddDependent as AddDependent };
