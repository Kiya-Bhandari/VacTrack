import vaccination from "../../assets/images/vaccination.png";
import FormButton from "../../components/form/FormButton";
import Base from "../../components/common/Base";
import "./home.css";

import React from "react";
import { Link } from "react-router-dom";
// import { connect } from "react-redux";

// import { userActions } from "../_actions";

class Home extends React.Component {
  // componentDidMount() {
  //   this.props.getUsers();
  // }

  handleDeleteUser(id) {
    return (e) => this.props.deleteUser(id);
  }

  render() {
    const { user, users } = this.props;
    return (
      <Base activeKey="home">
        <div className="main-screen">
          <div className="main-info">
            <div className="info">
              <h1>Let's Track Vaccination</h1>
              <p>
                With the exception of clean, safe drinking water, no human
                endeavor rivals immunization in combating infectious diseases
                and reducing mortality rates. Today, vaccination can prevent
                several infectious diseases, and there are new vaccines on the
                horizon with the potential to prevent even more.
              </p>
              <FormButton
                text="Read More"
                onClick={() => (window.location.href = "/aboutus")}
              ></FormButton>
            </div>
          </div>
          <div className="home-vaccine-image">
            <img src={vaccination} alt="Vaccine"></img>
          </div>
        </div>
      </Base>
    );
  }
}

// function mapState(state) {
//   const { users, authentication } = state;
//   const { user } = authentication;
//   return { user, users };
// }

// const actionCreators = {
//   getUsers: userActions.getAll,
//   deleteUser: userActions.delete,
// };

// const connectedHome = connect(mapState, actionCreators)(Home);
// export { connectedHome as Home };

export default Home;
