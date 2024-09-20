import { Link } from "react-router-dom";
import "./Header.css";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

export default function Header() {
  const { logout } = useContext(AuthContext);
  const notificationCount = 12; // Esempio: sostituire con il vero conteggio delle notifiche

  return (
    <header className="d-flex main-header mb-5 shadow-sm">
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-white">
          <ul className="navbar-nav w-100 d-flex flex-row align-items-center">
            <li className="nav-item notification-item position-relative">
              <Link 
                className={`nav-link btn ${notificationCount > 0 ? 'btn-primary fw-bold' : 'btn-light'} text-dark notification-button` } 
                to="/notifications"
                id="notification-button"
              >
                Notifiche
                {notificationCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {notificationCount}
                  </span>
                )}
              </Link>
            </li>
            <li className="nav-item ms-auto">
              <button className="nav-link btn btn-light text-dark" onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
