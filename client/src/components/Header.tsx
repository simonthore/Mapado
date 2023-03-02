import Logout from "./Logout";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className={"headerStyle"}>
      <div>
      <Link to="/">MAPADO</Link>
      </div>
      <Logout />
    </div>
  );
}
