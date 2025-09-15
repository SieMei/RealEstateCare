
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../services/auth";

export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}