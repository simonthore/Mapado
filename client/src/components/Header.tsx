import CSS from "csstype";
import { useGetProfileQuery } from "../gql/generated/schema";
import Logout from "./Logout";
import logo from "../assets/logo.png";

const HeaderStyles: CSS.Properties = {
  height: "7.5rem",
  width: "100vw",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: "#E6BFFB",
  fontFamily: "Rubik",
  fontWeight: 800,
  fontSize: "3rem",
  color: "#000000",
};

const searchBarStyles: CSS.Properties = {
  height: "2.5rem",
  width: "20rem",
  fontWeight: 700,
  fontSize: "1rem",
  color: "#000000",
  borderRadius: "10px",
  paddingLeft: "20px",
};

export default function Header() {
  const logoStyles: CSS.Properties = {
    height: "2.5rem",
  };

  return (
    <div style={HeaderStyles}>
      <div>
        <a href="/">
          <img src={logo} style={logoStyles} />
        </a>
      </div>
      <input
        style={searchBarStyles}
        type="text"
        placeholder="Rechercher une ville"
      ></input>
      <Logout />
    </div>
  );
}
