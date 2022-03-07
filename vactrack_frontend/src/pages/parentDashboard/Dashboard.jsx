import React from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Image, Figure, Button, Modal } from "react-bootstrap";

import { userActions, dependentActions } from "../../actions";

import Skeleton from "@material-ui/lab/Skeleton";
import Badge from "@material-ui/core/Badge";

import AddIcon from "@material-ui/icons/Add";

import Base from "../../components/common/Base";

import user from "../../assets/images/user.png";

import "../doctorDashboard/dashboard.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dependent: {},
      redirectShowDependent: false,
    };
    this.handleRedirectShowDependent =
      this.handleRedirectShowDependent.bind(this);
  }

  componentDidMount() {
    this.props.allDependent(localStorage.getItem("id"));
  }

  handleRedirectShowDependent(dependent) {
    return (
      <Redirect
        to={{
          pathname: `/parent-dashboard/${dependent.id}`,
          state: { dependent: dependent },
        }}
      />
    );
  }

  render() {
    return (
      <Base activeKey="profile">
        <div className="text-center dashboard">
          {this.props.dependents.length > 0 &&
            this.props.dependents.map((dependent) => (
              <Figure>
                <Figure.Image
                  src={dependent.imageUrl ? dependent.imageUrl : user}
                  className="kid-image dashboard-image"
                  roundedCircle
                  onClick={() =>
                    this.setState({
                      redirectShowDependent: true,
                      dependent: dependent,
                    })
                  }
                />

                <Figure.Caption className="fw-bold text-dark">
                  {dependent.firstName + " " + dependent.lastName}
                </Figure.Caption>
              </Figure>
            ))}
          {this.state.redirectShowDependent &&
            this.handleRedirectShowDependent(this.state.dependent)}
        </div>
      </Base>
    );
  }
}

function mapState(state) {
  const { dependents } = state.dependent;
  console.log("depends : ", dependents);
  return {
    dependents,
  };
}

const actionCreators = {
  allDependent: dependentActions.getAllDependent,
};

const connectedDashboard = connect(mapState, actionCreators)(Dashboard);
export { connectedDashboard as Dashboard };
