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

import "./dashboard.css";

class AddShowDependent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectShowDependent: false,
      redirectAddDependent: false,
      dependent: {},
    };
    this.handleRedirectShowDependent =
      this.handleRedirectShowDependent.bind(this);
    this.handleRedirectAddDependent =
      this.handleRedirectAddDependent.bind(this);
  }

  componentDidMount() {
    this.props.allDependent(localStorage.getItem("parentId"));
  }

  handleRedirectShowDependent(dependent) {
    return (
      <Redirect
        to={{
          pathname: `/doctor-dashboard/dependent/${dependent.id}`,
          state: { dependent: dependent },
        }}
      />
    );
  }

  handleRedirectAddDependent() {
    return <Redirect to="/doctor-dashboard/dependent/AddDependent" />;
  }

  render() {
    return (
      <Base activeKey="profile">
        <div className="text-center dashboard">
          {
            this.props.dependents.length > 0
              ? this.props.dependents.map((dependent) => (
                  <Figure>
                    {dependent.isNotify ? (
                      <Badge
                        color="primary"
                        overlap="circular"
                        badgeContent=" "
                      >
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
                      </Badge>
                    ) : (
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
                    )}

                    <Figure.Caption className="fw-bold text-dark">
                      {dependent.firstName + " " + dependent.lastName}
                    </Figure.Caption>
                  </Figure>
                ))
              : ""
            // <Figure>
            //   <Skeleton
            //     variant="circle"
            //     className="kid-image dashboard-image"
            //   />
            // </Figure>
          }

          <Figure>
            {/* <Link
              to="/doctor-dashboard/dependent/AddDependent"
              className="add dashboard-image"
            > */}
            <div
              className="add dashboard-image"
              onClick={() => this.setState({ redirectAddDependent: true })}
            >
              <AddIcon className="add-image" />
            </div>
            {/* </Link> */}
            <Figure.Caption className="fw-bold text-dark">
              Add Dependent
            </Figure.Caption>
          </Figure>
        </div>
        {this.state.redirectShowDependent &&
          this.handleRedirectShowDependent(this.state.dependent)}
        {this.state.redirectAddDependent && this.handleRedirectAddDependent()}
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

const connectedAddShowDependent = connect(
  mapState,
  actionCreators
)(AddShowDependent);
export { connectedAddShowDependent as AddShowDependent };
