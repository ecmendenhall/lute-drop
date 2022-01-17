import { MemoryRouter, Redirect, Route, Switch } from "react-router-dom";
import About from "../pages/About";
import Craft from "../pages/Craft";
import Swap from "../pages/Swap";

const Routes = () => {
  return (
    <MemoryRouter>
      <Switch>
        <Route exact path="/craft">
          <Craft />
        </Route>
        <Route exact path="/swap">
          <Swap />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/">
          <Redirect to="/craft" />
        </Route>
      </Switch>
    </MemoryRouter>
  );
};

export default Routes;
