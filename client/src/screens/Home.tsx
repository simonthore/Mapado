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

  const [searchParams, setSearchParams] = useSearchParams();

  // const [query, setQuery] = useState(searchParams.get("query") ?? "");

  const [state, setState] = useState<IState>({
    query: searchParams.get("query") ?? "",
    list: [],
  });

  const searchResult = useGetCityQuery({
    variables: { query: state.query ?? "" },
  });
  const dbCity = searchResult.data?.city.name;

  // const cities = data?.cities || [];

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
          ? cities.map((city) => (
              <CityCard key={city.id} cityName={city.name} />
            ))
          : state.list.map((city) => (
              <CityCard key={city.id} cityName={city.name} />
            ))}
      </div>
    </>
  );
}
