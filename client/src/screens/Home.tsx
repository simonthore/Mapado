import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import AnimatedCard from "../components/AnimatedCard";
import {
  useCitiesQuery,
  useGetProfileQuery,
  useLogoutMutation,
} from "../gql/generated/schema";
import IState from "../interfaces/IState";
import Mapado from "../assets/images/mapado_logo.png";
import directions from "../assets/images/directions.png";

export default function Home() {
  // gets the params from URL
  const [searchParams, setSearchParams] = useSearchParams();
  const [headerShown, setHeaderShown] = useState(true);

  const { loading: loadingCities, data, refetch } = useCitiesQuery();

  const [logout] = useLogoutMutation();

  const cities = data?.cities ?? [];
  // State to manage both URL query & cities to display
  const [state, setState] = useState<IState>({
    query: searchParams.get("query") ?? "",
    list: [],
  });

  const { data: currentUser, client } = useGetProfileQuery({
    errorPolicy: "ignore",
  });
  const currentUserRole = currentUser?.profile?.role;

  useEffect(() => {
    const storedHeaderShown = localStorage.getItem("headerShown");
    if (storedHeaderShown) {
      // Convertir la valeur en booléen
      setHeaderShown(storedHeaderShown === "true");
    }
    const handleBeforeUnload = () => {
      // Supprimer la clé du stockage local
      localStorage.removeItem("headerShown");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (headerShown) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "auto";
    // Sauvegarder la valeur dans le stockage local
    localStorage.setItem("headerShown", String(headerShown));
  }, [headerShown]);

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

  function toggleMenu() {
    const container = document.getElementById("container"),
      trigger = container?.querySelector("button.trigger");

    // container?.classList.toggle('container--open')
    trigger?.classList.toggle("trigger--active");
    setHeaderShown(!headerShown);
  }

  console.log(headerShown);

  return (
    <>
      <div id="container">
        <header className="intro">
          <Link to="/">
            <img className="intro__logo" src={Mapado} alt="logo" />
          </Link>
          <div className="intro__container">
            <div className="intro__text">
              <h1 className="intro__main__title main-color">
                Bienvenue sur Mapado
              </h1>
              <h2 className="intro__description main-color">
                Nous avons créé une application qui vous permet d'ajouter vos
                coins préférés à vos villes préférées. Ou futures villes
                préférées. Même si c'est notre application que vous allez
                préférer.
              </h2>
              <Link className="intro__go-to-app main-color" to="/cities-list">
                Essayer Mapado
              </Link>
            </div>
            <img
              className="intro__image"
              src={directions}
              alt="character-with-map"
            />
          </div>
        </header>
      </div>
    </>
  );
}
