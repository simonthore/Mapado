import CSS from "csstype";
import Logout from "./Logout";
import { Link } from "react-router-dom";

const HeaderStyles: CSS.Properties = {
  height: "8.6rem",
  width: "100vw",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: "transparent",
  fontFamily: "Rubik",
  fontWeight: 800,
  fontSize: "3rem",
  color: "#000000",
};


export default function Header() {
  return (
    <div style={HeaderStyles}>
      <div>
      <Link to="/">MAPADO</Link>
      </div>
      <Logout />
    </div>
  );
}
