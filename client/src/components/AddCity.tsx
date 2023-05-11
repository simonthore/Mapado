import { useState } from "react";
import {
  useCitiesQuery,
  useFetchCityNameMutation,
} from "../gql/generated/schema";
import CustomPopup from "./CustomPopup";
import { ApolloError } from "@apollo/client";

export default function AddCity() {
  // Initialisation de l'objet cityRequested
  const [cityRequested, setCityRequested] = useState({
    cityName: "",
  });
  const { refetch } = useCitiesQuery();

  // ! ! ! ! !
  // Mettre en place la même logique que sur les resolvers des POI et la manip des données côté front
  // ! ! ! ! !

  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("Exemple de titre");

  const [sendCityName] = useFetchCityNameMutation();

  const onClickSendCityName = () => {
    console.log(cityRequested);

    sendCityName({
      variables: { data: cityRequested },
    })
      .then((res) => {
        setPopupTitle(res.data?.fetchCityName!);
        refetch();
      })
      .catch((erreur: ApolloError) => {
        setPopupTitle(erreur.message);
      })
      .finally(() => {
        setShowPopup(true);
      });
  };

  return (
    <>
      <div className={"addCityContainer"}>
        <input
          type="text"
          placeholder="Nom de la ville"
          value={cityRequested.cityName}
          onChange={(e) => setCityRequested({ cityName: e.target.value })}
        ></input>
        <button onClick={onClickSendCityName} className={"tertiaryButton"}>
          Ajouter
        </button>
        <CustomPopup
          trigger={showPopup}
          setTrigger={setShowPopup}
          popupTitle={popupTitle}
        ></CustomPopup>
      </div>
    </>
  );
}
