import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { alert } from "./alert.reducer";
import { navItem } from "./navItem.reducer";
import { captcha } from "./captcha.reducer";
import { dependent } from "./dependent.reducer";
import { vaccine } from "./vaccine.reducer";
import { parent } from "./parent.reducer";

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  navItem,
  captcha,
  dependent,
  vaccine,
  parent,
});

export default rootReducer;
