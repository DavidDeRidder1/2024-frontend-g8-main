import { useEffect } from "react";
import { useAuth } from "../contexts/Auth.context";

export default function Logout() {
  const { isAuthed, logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  if (isAuthed) {
    return (
      <div className="row">
        <div className="col-12">
          <h1>Uitloggen...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-12">
        <h1>U bent uitgelogd!</h1>
      </div>
    </div>
  );
}
