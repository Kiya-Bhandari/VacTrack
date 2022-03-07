import React from "react";
import { connect, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Nav, Navbar } from "react-bootstrap";
import logo from "../../assets/images/logo.PNG";
import AccountCircle from "@material-ui/icons/AccountCircle";
import {
  getNavItem,
  navItemActions,
  userActions,
  alertActions,
} from "../../actions";
import Toggle from "../theme/Toggler";
import { Avatar } from "@material-ui/core";
import { NavDropdown } from "react-bootstrap";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    localStorage.getItem("id")
      ? this.props.authenticatedNavItem()
      : this.props.unauthenticatedNavItem();
  }

  handleSelect = (eventKey) => {
    if (eventKey == "logout") {
      this.props.logout();
    }
  };

  render() {
    const { navItem } = this.props;

    console.log(navItem);

    console.log(navItem);
    return (
      <Navbar collapseOnSelect expand="lg" onSelect={this.handleSelect}>
        <Navbar.Brand href="/">
          <img src={logo} alt="VacTrack"></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>

          <Nav activeKey={this.props.activeKey}>
            {navItem.navItem.map((item) => {
              return item.eventKey !== "profile" ? (
                <Nav.Item key={item.id}>
                  <Nav.Link eventKey={item.eventKey} href={item.href}>
                    {item.label}
                  </Nav.Link>
                </Nav.Item>
              ) : (
                <NavDropdown
                  title={
                    <Avatar
                      style={{
                        backgroundColor: "#081442",
                      }}
                    >
                      {localStorage.getItem("email") !== "null"
                        ? localStorage.getItem("email")[0]
                        : ""}
                    </Avatar>
                  }
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item href="/doctor-dashboard">
                    Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/" eventKey="logout">
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapState = (state) => ({
  navItem: state.navItem,
});

const actionCreators = {
  logout: userActions.logout,
  error: alertActions.error,
  authenticatedNavItem: navItemActions.authenticatedNavItem,
  unauthenticatedNavItem: navItemActions.unauthenticatedNavItem,
};

const connectedHeader = connect(mapState, actionCreators)(Header);
export { connectedHeader as Header };
