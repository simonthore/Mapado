import { findByLabelText } from "@testing-library/react";
import CSS from "csstype";
import Header from "./Header";

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
  height: "auto",
  width: "auto",
  backgroundColor: "#FFFFFF",
  border: "10px solid #EC5D5C",
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
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
  border: "1px solid #EC5D5C",
  margin: "4rem",
  padding: "1rem",
};

const pageStyles: CSS.Properties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: 'center',
}

export default function AddManageCities({ cities }: Cities) {
  return (
<div style={pageStyles}>
    <div style={AddManageStyles}>
      <a style={backButton} href="/">
        Go Back
      </a>
      <h2 style={titleStyles}>Ajouter une ville</h2>

      <div style={manageCityStyle}>
        <input
          type="text"
          placeholder="Nom de la ville"
          style={inputStyles}
        ></input>
        <button style={AddCityButtonStyle}>Ajouter</button>
      </div>

      <h2 style={titleStyles}>Gérer les villes</h2>
      <div>
        {cities.map((city: City) => {
          return (
            <div key={city.id} style={manageCityStyle}>
              <p style={cityLabel}>{city.name}</p>
              <button style={deleteButtonStyles}>Supprimer</button>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
}
