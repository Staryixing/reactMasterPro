import { Router, Route, Switch, Redirect } from "dva/router";
import Login from "./routes/Login/index.tsx";
import MainPage from "./routes/MainPage/index.jsx";

function RouterConfig({ history }) {
  window.G_history = history;
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" component={MainPage} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
