import { useState } from "react";
import {useFetchPoiCoordinatesMutation, useGetCityQuery} from "../gql/generated/schema";

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

  const [sendPoiNameOrAddress] = useFetchPoiCoordinatesMutation({onCompleted: () => refetch()});

    const {loading, data, refetch} = useGetCityQuery({
        variables: {query: cityName!},
    });

  const onClickSendNewPoi = () => {
      sendPoiNameOrAddress({ variables: { data: poiRequested } });
    console.log("data envoyée au back", poiRequested);
      refetch(); // Rafraîchir les données après la mutation
  };

  return (
    <div>
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
    </div>
  );
}
