import CSS from "csstype";
import { FormEvent, useEffect, useState } from "react";
import { useFetchCityNameMutation } from "../gql/generated/schema";
import { findByLabelText } from "@testing-library/react";
import Card from "../components/Card";

interface City {
  id: number;
  name: string;
  // latitude?: number;
  // longitude?: number;
  // photo?: string;
  // users?: User[];
  // poi?: Poi[];
}

interface Cities {
  cities: City[];
}

export default function AddManageCities({ cities }: Cities) {
  // gestion de l'input
  const [cityNameRequested, setCityNameRequested] = useState({
    cityNameRequested: "",
  });

  const [sendCityName] = useFetchCityNameMutation();

  const onClickSendCityName = () => {
    console.log(cityNameRequested);
    console.log(typeof cityNameRequested);
    sendCityName({ variables: { data: cityNameRequested } });
  };

  return (
    <Card customClass={"registerCard"}>
      <h2 className={"title"}>Ajouter une ville</h2>

      <div className={"addCityContainer"}>
        <input
          type="text"
          placeholder="Nom de la ville"
          value={cityNameRequested.cityNameRequested}
          onChange={(e) =>
            setCityNameRequested({ cityNameRequested: e.target.value })
          }
        ></input>
        <button onClick={onClickSendCityName} className={"tertiaryButton"}>
          Ajouter
        </button>
      </div>

      <div className={"manageCitiesContainer"}>
        <h2 className={"title"}>Gérer les villes</h2>
        {cities.map((city: City) => {
          return (
            <div className={"manageOneCityContainer"}>
              <p className={"cityLabel"}>{city.name}</p>
              <button className={"primaryButton"}>Supprimer</button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
