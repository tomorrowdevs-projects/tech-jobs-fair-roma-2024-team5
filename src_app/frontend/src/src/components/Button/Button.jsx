import { Link } from "react-router-dom";
import './Button.css'

export default function Button({children, href, className, ...props}) {
  if (href) {
    return <Link to={href} className={"button-basic " + className ?? ''} {...props} >{children}</Link>
  }

  return <button className={"button-basic " + className ?? ''} {...props}>{children}</button>
}