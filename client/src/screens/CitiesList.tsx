import { useEffect } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import AnimatedCard from "../components/AnimatedCard";
import ICity from "../interfaces/ICity";
import { useCitiesQuery } from "../gql/generated/schema";

export default function CitiesList({ state }) {
  // gets the params from URL
  const [searchParams, setSearchParams] = useSearchParams();

  const { loading: loadingCities, data, refetch } = useCitiesQuery();

  const cities = data?.cities ?? [];

  useEffect(() => {
    document.body.style.overflow = "auto";
  });

  return (
    <>
      <div className="citiesList_container">
        <section className={"citiesList_wrapper"}>
          {state.query === ""
            ? // if there is no search, display all cities
              cities.map((city: ICity) => (
                <NavLink
                  className="cardLink"
                  key={city.id}
                  to={`/info/${city.name}`}
                >
                  <AnimatedCard
                    key={city.id}
                    cityName={city.name}
                    cityPhoto={city.photo}
                  />
                </NavLink>
              ))
            : state.list.map((city: ICity) => (
                // if there is a search display the cities corresponding
                <NavLink key={city.id} to={`/info/${city.name}`}>
                  <AnimatedCard
                    key={city.id}
                    cityName={city.name}
                    cityPhoto={city.photo}
                  />
                </NavLink>
              ))}
        </section>
      </div>
    </>
  );
}
