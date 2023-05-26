import { useState } from "react";
import { useFetchPoiCoordinatesMutation } from "../gql/generated/schema";
import { ApolloError } from "@apollo/client";
import checkIcon from "../assets/svg/check.svg";
import errorIcon from "../assets/svg/error.svg";
import Toast from "./Toast";

interface PoiProps {
  cityId: number;
  cityName: string;
}

interface PoiRequestedInterface {
  poiNameOrAdress: string;
  cityId: number;
  cityName: string;
}

interface ToastInterface {
  id: number;
  title: string;
  description: string;
  icon: string;
  backgroundColor: string;
}

export default function AddPoi({ cityId, cityName }: PoiProps) {
  // Initialisation de l'objet poiRequested
  const [poiRequested, setPoiRequested] = useState<PoiRequestedInterface>({
    poiNameOrAdress: "",
    cityId: 0,
    cityName: "",
  });

  // Initialisation de l'objet Toast
  const [toastData, setToastData] = useState<ToastInterface>({
    id: 0,
    title: "",
    description: "",
    icon: "",
    backgroundColor: "",
  });
  const [showToast, setShowToast] = useState(false);

  const [sendPoiNameOrAdress] = useFetchPoiCoordinatesMutation();

  const onClickSendNewPoi = () => {
    sendPoiNameOrAdress({ variables: { data: poiRequested } })
      .then((res) => {
        /* console.log("log du then", res); */

        setToastData({
          id: Math.floor(Math.random() * 100 + 1),
          description: res?.data?.fetchPoiCoordinates!,
          title: "Super ! 👍",
          backgroundColor: "green",
          icon: checkIcon,
        });
        /*  console.log("log de toastData au click après le set", toastData); */
      })
      .catch((erreur: ApolloError) => {
        /* console.log(erreur); */
        setToastData({
          id: Math.floor(Math.random() * 100 + 1),
          description: erreur.message,
          title: "Oups... 🧐",
          backgroundColor: "#bd2424",
          icon: errorIcon,
        });
      })
      .finally(() => {
        setShowToast(true);
      });
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
      <Toast
        toast={toastData}
        position={"bottomRight"}
        autoDelete={true}
        autoDeleteTime={5000}
        visible={showToast}
        setVisible={setShowToast}
      />
    </>
  );
}
