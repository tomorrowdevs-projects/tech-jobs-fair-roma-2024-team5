import { Link } from "react-router-dom";
import './BackNavigationLink.css'

export default function BackNavigationLink({href}) {
  return <Link to={href} className="back-navigation-link">
    <span>←</span>
  </Link>
}