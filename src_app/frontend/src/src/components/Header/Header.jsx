import { Link } from "react-router-dom";
import "./Header.css";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

export default function Header() {
  const {logout} = useContext(AuthContext);

  return (
    <header className="d-flex main-header mb-5 shadow-sm">
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-white">
            <ul className="navbar-nav w-100 d-flex flex-row ">
              <li className="nav-item">
                <Link className="nav-link" to="/notifications">
                  Notifiche
                </Link>
              </li>
              <li className="nav-item ms-auto">
                <button className="nav-link logout-button" onClick={logout}>
                  Logout
                </button>
              </li>
            </ul>
        </nav>
      </div>
    </header>
  );
}
