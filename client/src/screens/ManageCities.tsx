import { findByLabelText } from "@testing-library/react";

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

export default function ManageCities({cities}: Cities) {
    return (
        <div className={"addManageStyles"}>
            <h2 className={"title"}>Ajouter une ville</h2>

            <div className={"addCityContainer"}>
                <input
                    type="text"
                    placeholder="Nom de la ville"
                ></input>
                <button className={"tertiaryButton"}>Ajouter</button>
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
        </div>
    );
}
