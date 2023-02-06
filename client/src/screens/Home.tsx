import CSS from "csstype";
import {truncate} from "fs";
import {useEffect, useState} from "react";
import {Routes} from "react-router";
import {Route} from "react-router-dom";
import CityCard from "../components/CityCard";
import {
    useCitiesQuery,
    useGetProfileQuery,
    useLogoutMutation,
} from "../gql/generated/schema";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {Location} from "history";
import Login from "./Login";
import Logout from "../components/Logout";
import Header from "../components/Header";

const styles: CSS.Properties = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: "2rem",
    alignItems: "center",
};
const addCityButtonStyles: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "fit-content",
    width: "fit-content",
    margin: "2rem",
    color: "#EC5D5C",
    fontFamily: "Josefin Sans",
    fontWeight: 700,
    fontSize: "1.25rem",
};

interface City {
    id: number;
    name: string;
    city_area: string;
    photo?: string;
    user: {}[];
}

interface Cities {
    cities: City[];
}

// interface currentUser {
//   email: string;
//   password: string
// }

export default function Home() {
    const [toLoginPage, setToLoginPage] = useState(false);
    const {loading: loadingCities, data} = useCitiesQuery();

    const cities = data?.cities || [];
    console.log(cities)

    return (
        <div style={styles}>
            <a href="/manage-cities">
                <button style={addCityButtonStyles}>
                    <AddCircleOutlineOutlinedIcon/>
                    <p>Ajouter une ville</p>
                </button>
            </a>

            {cities.map((city) => {
                return <CityCard key={city.id} cityName={city.name} cityPhoto={city.photo}/>;
            })}
        </div>
    );
}
