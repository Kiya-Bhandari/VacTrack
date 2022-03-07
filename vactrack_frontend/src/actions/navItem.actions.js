import { navItemConstants } from "../constants";

export const navItemActions = {
  authenticatedNavItem,
  unauthenticatedNavItem,
  getNavItem,
};

export function authenticatedNavItem() {
  return (dispatch) => {
    return dispatch({
      type: navItemConstants.AUTHENTICATED_NAV_ITEM,
    });
  };
}

export function getNavItem() {
  return (dispatch) => {
    return dispatch({
      type: navItemConstants.GET_NAV_ITEM,
    });
  };
}

export function unauthenticatedNavItem() {
  return (dispatch) => {
    return dispatch({
      type: navItemConstants.UNAUTHENTICATED_NAV_ITEM,
    });
  };
}
