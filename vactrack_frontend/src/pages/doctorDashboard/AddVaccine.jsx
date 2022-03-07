import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Card, Table, Accordion } from "react-bootstrap";
import { dependentActions } from "../../actions";
import FormButton from "../../components/form/FormButton";

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { vaccine } from "../../reducers/vaccine.reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import FormSelect from "../../components/form/FormSelect";

class AddVaccine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previous: "",
      current: "",
    };
    this.vaccineList = this.vaccineList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    console.log("value:", value);
    let splitName = name.split(" ");
    console.log("split:", splitName);
    let storeKey = splitName[0] + " " + splitName[1] + " " + splitName[2];
    if (!(storeKey in this.state)) {
      let valueDT = [];
      if (splitName[3][0] === "d") {
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
      if (splitName[3][0] === "d") {
        if (stateValue.length === 2 || !/^[0-9]+$/.test(stateValue[0])) {
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

  handleSubmit(e) {
    e.preventDefault();
    let vaccineDetail = Object.entries(this.state).slice(2);
    console.log("vacc : ", vaccineDetail);
    vaccineDetail.forEach((detail) => {
      let vacId = detail[0].split(" ")[0];
      let doseNo = detail[0].split(" ")[1];
      let doseDT = detail[1][0];
      let status = detail[1][1];
      let category = detail[0].split(" ")[2];
      if (this.props.addDependent) {
        this.props.registerDependentVaccine({
          dependentId: this.props.dependentId,
          vaccineId: vacId,
          doseNumber: doseNo,
          doseDateTime: doseDT,
          status: status,
          category: category,
        });
      } else {
        this.props.addOtherDependentVaccine({
          dependentId: this.props.depId,
          vaccineId: vacId,
          doseNumber: doseNo,
          doseDateTime: doseDT,
          status: status,
          category: category,
        });
      }
    });
  }

  vaccineList(vaccines, categoryId) {
    return (
      <>
        {vaccines.map((vaccine) => (
          <Table responsive>
            <thead>
              <tr>
                <th style={{ width: "40%" }}>{vaccine.name}</th>
                <th style={{ width: "20%" }}>Date & Time</th>
                <th style={{ width: "20%" }}>Status</th>
                {/* <th style={{ width: "20%", textAlign: "center" }}>
                  Set Reminder
                </th> */}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: vaccine.dosageNumber }).map((_, index) => (
                <tr key={index}>
                  <td>Dose {index + 1}</td>
                  <td>
                    <input
                      type="datetime-local"
                      name={`${vaccine.id} ${index + 1} ${categoryId} datetime`}
                      onChange={this.handleChange}
                    ></input>
                  </td>
                  <td>
                    <FormSelect
                      name={`${vaccine.id} ${index + 1} ${categoryId} status`}
                      // value={this.state.status}
                      onChange={this.handleChange}
                    >
                      <option value="">Select Vaccine Status</option>
                      {this.props.vaccineStatus.map((status) => (
                        <option value={status.id}>{status.status}</option>
                      ))}
                    </FormSelect>
                  </td>
                  {/* <td className="text-center">
                    <FontAwesomeIcon icon={faBell} />
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        ))}
      </>
    );
  }

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Accordion>
            {this.props.vaccineCategory.length > 0 &&
              this.props.vaccineCategory.map((item) => (
                <Card className="category" key={item.id}>
                  <Accordion.Toggle
                    as={Card.Header}
                    eventKey={item.name}
                    className="fw-bold card-header"
                    onClick={() => {
                      this.handleClick(item.name);
                    }}
                  >
                    {item.name}
                    <span
                      id={`plus ${item.name}`}
                      style={{ display: "inline-block" }}
                    >
                      <AddIcon />
                    </span>
                    <span id={`minus ${item.name}`} style={{ display: "none" }}>
                      <RemoveIcon />
                    </span>
                  </Accordion.Toggle>

                  <Accordion.Collapse eventKey={item.name}>
                    <Card.Body>
                      {this.vaccineList(item.vaccine, item.id)}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
          </Accordion>
          <div className="text-center">
            <FormButton text="Submit" type="submit" />
          </div>
        </Form>
      </>
    );
  }
}

function mapState(state) {
  const { dependentId } = state.dependent;

  return {
    dependentId,
  };
}

const actionCreators = {
  registerDependentVaccine: dependentActions.registerDependentVaccine,
  addOtherDependentVaccine: dependentActions.addOtherDependentVaccine,
};

const connectedAddVaccine = connect(mapState, actionCreators)(AddVaccine);

export { connectedAddVaccine as AddVaccine };
