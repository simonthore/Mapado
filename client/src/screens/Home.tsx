import CSS from "csstype";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CityCard from "../components/CityCard";
import { useCitiesQuery, useGetCityQuery } from "../gql/generated/schema";
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

interface IState {
  query: string;
  list: City[];
}

// interface currentUser {
//   email: string;
//   password: string
// }

export default function Home({ cities }: Cities) {
  const [toLoginPage, setToLoginPage] = useState(false);

  const { loading: loadingCities, data } = useCitiesQuery();

  // gets the paras from URL
  const [searchParams, setSearchParams] = useSearchParams();

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

      <div style={styles}>
        <a href="/manage-cities">
          <button style={addCityButtonStyles}>
            <p>AJOUTER UNE VILLE</p>
          </button>
        </a>
        {state.query === ""
        // if there is no search, display all cities
          ? cities.map((city) => (
              <CityCard key={city.id} cityName={city.name} />
            ))
            : state.list.map((city) => (
            // if there is a search display the cities corresponding 
              <CityCard key={city.id} cityName={city.name} />
            ))}
      </div>
    </>
  );
}
