import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

export default function BaseLayout() {
  const { authInfo } = useContext(AuthContext) || {};

  return <>
  {authInfo && <Header></Header>}
  <Outlet></Outlet>
  </>
}