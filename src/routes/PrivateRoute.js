
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ component: C, ...rest }) {
  const authed = useSelector((s) => s.auth.isAuthenticated);
  return (
    <Route {...rest} render={(props) => authed ? <C {...props} /> : <Redirect to="/login" />} />
  );
}
