import CSS from "csstype";
import { FormEvent, useEffect, useState } from "react";
import { useFetchCityNameMutation } from "../gql/generated/schema";

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

const AddManageStyles: CSS.Properties = {
  margin: "0 auto",
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#173472",
  width: "fit-content",
};

const titleStyles: CSS.Properties = {
  color: "#EC5D5C",
  fontFamily: "Rubik",
  fontWeight: 600,
  fontSize: "1.5rem",
};

const inputStyles: CSS.Properties = {
  fontWeight: 700,
  fontSize: "1rem",
  backgroundColor: "#F0F0F0",
  paddingLeft: "20px",
  width: "21.5rem",
  height: "3rem",
  margin: "1.5rem",
  borderRadius: "5px",
  padding: "10px",
};

const cityLabel: CSS.Properties = {
  backgroundColor: "#EC5D5C",
  color: "#FFEBE9",
  width: "21.5rem",
  height: "3rem",
  margin: "1.5rem",
  borderRadius: "5px",
  padding: "10px",
};

const deleteButtonStyles: CSS.Properties = {
  border: "1px solid #EC5D5C",
  color: "#EC5D5C",
  height: "3rem",
  width: "14.3rem",
  margin: "1.5rem",
  padding: "10px",
  borderRadius: "5px",
  fontWeight: 700,
};

const manageCityStyle: CSS.Properties = {
  display: "flex",
  flexDirection: "row",
};

const AddCityButtonStyle: CSS.Properties = {
  color: "#FFFFFF",
  backgroundColor: "#3270F4",
  height: "3rem",
  width: "14.3rem",
  margin: "1.5rem",
  padding: "10px",
  borderRadius: "5px",
  border: "2px solid #EC5D5C",
};

const backButton: CSS.Properties = {
  alignSelf: "flex-start",
  justifySelf: "flex-start",
  fontFamily: "Rubik",
  fontSize: "2.25rem",
  fontWeight: 500,
};

export default function AddManageCities({ cities }: Cities) {
  //objet récupéré depuis l'API
  //const [city, setCity] = useState({});
  // gestion de l'input
  const [cityNameRequested, setCityNameRequested] = useState({
    cityNameRequested: "",
  });

  const [sendCityName] = useFetchCityNameMutation();
  // useEffect(() => {
  //   fetch("http://localhost:4000/cities")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCity(data);
  //     });
  // }, []);
  //console.log(city);

  const onClickSendCityName = () => {
    console.log(cityNameRequested);
    console.log(typeof cityNameRequested);
    sendCityName({ variables: { data: cityNameRequested } });
  };

  return (
    <div style={AddManageStyles}>
      <h2 style={titleStyles}>Ajouter une ville</h2>

      <div style={manageCityStyle}>
        {/* useState pour vérifier la data de l'input
          Au clic du bouton Ajouter changer la valeur de cityRequested sur index.ts
          puis requête gql pour insérer City dans la DB
          Voir pour l'unicité tout de suite ?*/}
        <input
          type="text"
          placeholder="Nom de la ville"
          style={inputStyles}
          value={cityNameRequested.cityNameRequested}
          onChange={(e) =>
            setCityNameRequested({ cityNameRequested: e.target.value })
          }
        ></input>
        <button onClick={onClickSendCityName} style={AddCityButtonStyle}>
          Ajouter
        </button>
      </div>

      <h2 style={titleStyles}>Gérer les villes</h2>
      <div>
        {cities.map((city: City) => {
          return (
            <div style={manageCityStyle}>
              <p key={city.id} style={cityLabel}>
                {city.name}
              </p>
              <button style={deleteButtonStyles}>Supprimer</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
