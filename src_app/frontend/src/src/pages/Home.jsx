import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

export default function Home() {
  const {authInfo} = useContext(AuthContext);
  return <div>Welcome user {authInfo?.userId}</div>
}