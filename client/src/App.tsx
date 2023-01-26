import React from "react";
import "./App.css";
import {gql, useQuery} from '@apollo/client';
import binoculars from "./assets/images/binculars.png"

const GET_CITIES = gql`
query Cities {
  cities {
    id
    name
  }
}
`

interface Cities {
    id: number;
    name: string;
}

function App() {
    const {data} = useQuery<{ cities: Cities[] }>(GET_CITIES);
    console.log(data)

    const cities = data?.cities || []

    const fakeCities = [
        {
            "id": 3,
            "name": "Bordeaux"
        },
        {
            "id": 4,
            "name": "Nice"
        },
        {
            "id": 5,
            "name": "Lyon"
        },
        {
            "id": 6,
            "name": "Paris"
        },
        {
            "id": 8,
            "name": "Marseille"
        },
        {
            "id": 9,
            "name": "Nantes"
        },
        {
            "id": 10,
            "name": "Rennes"
        }
    ]
    return (
        <div className="App">
            <div className={"title"}>
                <h1>
                    Mapado
                </h1>
                <img src={binoculars} alt={"binoculars"}/>
            </div>

            <div className={"cities"}>
                {fakeCities.map((c) =>
                    <h1 className={"city"}>{c.name}</h1>
                )}
            </div>
        </div>
    );
}

export default App;
