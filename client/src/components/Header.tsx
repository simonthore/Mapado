import CSS from "csstype";
import {useGetProfileQuery} from "../gql/generated/schema";
import Logout from "./Logout";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

interface HeaderProps {
    icon: string;
}

const HeaderStyles: CSS.Properties = {
    height: "8.6rem",
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

const searchBarStyles: CSS.Properties = {
    height: "2.5rem",
    width: "20rem",
    fontWeight: 700,
    fontSize: "1rem",
    color: "#000000",
    borderRadius: "10px",
    paddingLeft: "20px",
};

export default function Header({icon}: HeaderProps) {

    return (
        <div style={HeaderStyles}>
            <div>
                <a href="/home" style={{color: "#EC5D5C"}}>MAPADO</a>
            </div>
            <input
                style={searchBarStyles}
                type="text"
                placeholder="Rechercher une ville"
            ></input>
            <ul style={{display: "flex", justifyContent: "flex-start", gap:"1rem"}}>
                <li><Logout/></li>
            </ul>

        </div>
    );
}
