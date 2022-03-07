import { navItemConstants } from "../constants";

const initialState = {
  navItem: [
    {
      id: 1,
      eventKey: "home",
      href: "/",
      label: "Home",
    },
    {
      id: 2,
      eventKey: "aboutus",
      href: "/aboutus",
      label: "About Us",
    },
    {
      id: 3,
      eventKey: "help",
      href: "/help",
      label: "Help",
    },
    {
      id: 4,
      eventKey: "signin",
      href: "/signin",
      label: "Sign In",
    },
    // {
    //   id: 5,
    //   eventKey: "signup",
    //   href: "/signup",
    //   label: "Sign Up",
    // },
  ],
};

export function navItem(state = initialState, action) {
  switch (action.type) {
    case navItemConstants.AUTHENTICATED_NAV_ITEM:
      return {
        ...state,
        navItem: [
          {
            id: 1,
            eventKey: "home",
            href: "/",
            label: "Home",
          },
          {
            id: 2,
            eventKey: "aboutUs",
            href: "/aboutus",
            label: "About Us",
          },
          {
            id: 3,
            eventKey: "help",
            href: "/help",
            label: "Help",
          },
          {
            id: 7,
            eventKey: "profile",
            // href: "/doctor-dashboard",
            // label: (
            //   <NavDropdown
            //     title={
            //       <Avatar
            //         style={{
            //           backgroundColor: "#081442",
            //         }}
            //       >
            //         {localStorage.getItem("email")
            //           ? localStorage.getItem("email")[0]
            //           : "a"}
            //       </Avatar>
            //     }
            //     id="collasible-nav-dropdown"
            //   >
            //     <NavDropdown.Item href="/doctor-dashboard">
            //       Dashboard
            //     </NavDropdown.Item>
            //     <NavDropdown.Item href="/">Logout</NavDropdown.Item>
            //   </NavDropdown>
            //   // <Avatar style={{ backgroundColor: "#081442" }}>
            //   //   {localStorage.getItem("email")
            //   //     ? localStorage.getItem("email")[0]
            //   //     : "a"}
            //   // </Avatar>
            // ),
          },
        ],
      };
    case navItemConstants.UNAUTHENTICATED_NAV_ITEM:
      return { ...initialState };
    default:
      return state;
  }
}
