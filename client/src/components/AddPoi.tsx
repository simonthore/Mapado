import { useState } from "react";
import { useFetchPoiCoordinatesMutation } from "../gql/generated/schema";
import CustomPopup from "./CustomPopup";
import { ApolloError } from "@apollo/client";

interface PoiProps {
  cityId: number;
  cityName: string;
}

export default function AddPoi({ cityId, cityName }: PoiProps) {
  // Initialisation de l'objet poiRequested
  const [poiRequested, setPoiRequested] = useState({
    poiNameOrAdress: "",
    cityId: 0,
    cityName: "",
  });

  const [popupTitle, setPopupTitle] = useState("");

  const [sendPoiNameOrAdress] = useFetchPoiCoordinatesMutation();

  const [showPopup, setShowPopup] = useState(false);

  const onClickSendNewPoi = () => {
    sendPoiNameOrAdress({ variables: { data: poiRequested } })
      .then((res) => {
        console.log("log du then", res);
        setPopupTitle(res?.data?.fetchPoiCoordinates!);
      })
      .catch((erreur: ApolloError) => {
        console.log(erreur);
        setPopupTitle(erreur.message);
      })
      .finally(() => {
        setShowPopup(true);
      });
    console.log("data envoyée au back", poiRequested);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Nom ou Adresse du POI"
        value={poiRequested.poiNameOrAdress}
        onChange={(e) =>
          setPoiRequested((prevState) => ({
            ...prevState,
            poiNameOrAdress: e.target.value,
            cityId: cityId,
            cityName: cityName,
          }))
        }
      ></input>
      <button onClick={onClickSendNewPoi} className={"tertiaryButton"}>
        Ajouter
      </button>
      <CustomPopup
        trigger={showPopup}
        setTrigger={setShowPopup}
        popupTitle={popupTitle}
      ></CustomPopup>
    </>
  );
}
