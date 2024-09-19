import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="d-flex main-header mb-5 shadow-sm">
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-white">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to='/notifications'>Notifiche</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
