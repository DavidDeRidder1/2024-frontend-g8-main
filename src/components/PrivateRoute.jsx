import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/Auth.context";
import { useEffect } from "react";
export default function PrivateRoute() {
  const { ready, isAuthed, checkTokenExpiration, logout } = useAuth();

  useEffect(() => {
    if (!checkTokenExpiration()) {
      logout();
    }
  }, [logout]);

  const loginPath = `/login`;

  if (!ready) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Loading...</h1>
            <p>
              Gelive te wachten terwijl we checken of je de app mag gebruiken en
              terwijl de app aan het laden is.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthed) {
    return <Outlet />;
  }

  return <Navigate replace to={loginPath} />;
}
