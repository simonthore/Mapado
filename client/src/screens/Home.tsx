import { useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AnimatedCard from "../components/AnimatedCard";
import ICity from "../interfaces/ICity";
import { filterBySearch } from "../utils/helpers";
import { useCitiesQuery } from "../gql/generated/schema";
import IState from "../interfaces/IState";

export default function Home() {
  // gets the params from URL
  const [searchParams, setSearchParams] = useSearchParams();

  const { loading: loadingCities, data, refetch } = useCitiesQuery();

  const cities = data?.cities ?? [];
  // State to manage both URL query & cities to display
  const [state, setState] = useState<IState>({
    query: searchParams.get("query") ?? "",
    list: [],
  });

  // takes in value from the search bar and returns a filtered list of the cities to display
  //(filter improves with each letter)
  //searchParams controls the URL (what comes after the "?")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const results = cities.filter((city) => {
      if (e.target.value === " ") return cities;
      return city.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearchParams({ query: e.target.value });
    setState({
      query: e.target.value,
      list: results,
    });
  };

  return (
    <>
      <form>
        <input
          value={state.query}
          onChange={handleChange}
          placeholder="Rechercher une ville..."
          type="search"
        ></input>
      </form>

      <div className={"homeStyle"}>
        <a href="/manage-cities">
          <button className={"addCityButtonStyles"}>
            <AddCircleOutlineOutlinedIcon />
            <p>AJOUTER UNE VILLE</p>
          </button>
        </a>
        {state.query === ""
          ? // if there is no search, display all cities
            cities.map((city: ICity, index: number) => (
              <NavLink key={index} to={`/info/${city.name}`}>
                <AnimatedCard
                  key={city.id}
                  cityName={city.name}
                  cityPhoto={city.photo}
                />
              </NavLink>
            ))
          : state.list.map((city: ICity, index: number) => (
              // if there is a search display the cities corresponding
              <NavLink key={index} to={`/info/${city.name}`}>
                <AnimatedCard
                  key={index}
                  cityName={city.name}
                  cityPhoto={city.photo}
                />
              </NavLink>
            ))}
      </div>
    </>
  );
}
