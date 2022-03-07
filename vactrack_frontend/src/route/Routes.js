import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import AboutUs from "../pages/aboutUs/AboutUs";
import Help from "../pages/help/Help";
import { SignIn } from "../pages/signIn";
import { SignUp } from "../pages/signUp";
import { AddShowDependent } from "../pages/doctorDashboard";
import { Dashboard as DoctorDashboard } from "../pages/doctorDashboard/Dashboard";
import { AddDependent } from "../pages/doctorDashboard/AddDependent";
import { DependentDetail as doctorDependentDetail } from "../pages/doctorDashboard/DependentDetail";
import { Dashboard as ParentDashboard } from "../pages/parentDashboard/Dashboard";
import { DependentDetail as parentDependentDetail } from "../pages/parentDashboard/DependentDetail";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/aboutus" component={AboutUs} />
        <Route path="/Help" component={Help} />
        <Route exact path="/doctor-dashboard" component={DoctorDashboard} />
        <Route
          exact
          path="/doctor-dashboard/dependent"
          component={AddShowDependent}
        />
        <Route
          exact
          path="/doctor-dashboard/dependent/AddDependent"
          component={AddDependent}
        />

        <Route
          exact
          path="/doctor-dashboard/dependent/:childId"
          component={doctorDependentDetail}
        />

        <Route exact path="/parent-dashboard" component={ParentDashboard} />

        <Route
          exact
          path="/parent-dashboard/:childId"
          component={parentDependentDetail}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
