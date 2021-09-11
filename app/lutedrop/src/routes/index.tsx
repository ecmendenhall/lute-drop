import { MemoryRouter, Redirect, Route, Switch } from "react-router-dom";
import About from "../pages/About";
import Claim from "../pages/Claim";
import Swap from "../pages/Swap";

const Routes = () => {
  return (
    <MemoryRouter>
      <Switch>
        <Route exact path="/claim">
          <Claim />
        </Route>
        <Route exact path="/swap">
          <Swap />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/">
          <Redirect to="/claim" />
        </Route>
      </Switch>
    </MemoryRouter>
  );
};

export default Routes;
