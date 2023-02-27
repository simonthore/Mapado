import CSS from "csstype";
import { truncate } from "fs";
import { KeyboardEventHandler, useEffect, useState } from "react";
import { Routes } from "react-router";
import { Route, useSearchParams } from "react-router-dom";
import CityCard from "../components/CityCard";
import {
  useCitiesQuery,
  useGetCityQuery,
  useGetProfileQuery,
  useLogoutMutation,
} from "../gql/generated/schema";
import { Location } from "history";
import Login from "./Login";
import Logout from "../components/Logout";
import Header from "../components/Header";

const styles: CSS.Properties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  margin: "2rem",
};
const addCityButtonStyles: CSS.Properties = {
  height: "17rem",
  width: "15.6rem",
  border: "10px solid #EC5D5C",
  borderRadius: "40px",
  backgroundColor: "#FFFFFF",
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

export default function Home({ cities }: Cities) {
  const [toLoginPage, setToLoginPage] = useState(false);

  const { loading: loadingCities, data } = useCitiesQuery();

  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("query") ?? "");


  // setSearchParams(newQueryParameters);

  // const city = searchParams.get("city");

  // // const findPOI = searchParams.get("poi")

  const searchResult = useGetCityQuery({
    variables: { query: query ?? "" },
  });
  const dbCity = searchResult.data?.city.name;

  // const cities = data?.cities || [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ query: e.target.value });
    setQuery(e.target.value);
  };

  return (
    <>
      <form>
        <input
          value={query}
          onChange={handleChange}
          placeholder="Rechercher une ville..."
          type="search"
        ></input>
      </form>

      <div style={styles}>
        <a href="/manage-cities">
          <button style={addCityButtonStyles}>
            <p>AJOUTER UNE VILLE</p>
          </button>
        </a>
      </div>

      <div>
        {/* {displayCity ? (
         city && <CityCard key={city.name} cityName={city.name} />
        ) : (
          cities.map((city) => {
            return <CityCard key={city.id} cityName={city.name} />;
          })
        )} */}
        {dbCity === undefined ? (
          <p>We don't know that city</p>
        ) : (
          <CityCard cityName={dbCity} />
        )}
      </div>
    </>
  );
}
