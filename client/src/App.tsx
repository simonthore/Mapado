import React from "react";
import "./App.css";
import {gql, useQuery} from '@apollo/client';

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
    const {data} = useQuery<{cities: Cities[]}>(GET_CITIES);
console.log(data)

    const cities = data?.cities || []

    return (
        <div className="App">
            <p>
                Salut c'est Simon je garde les yeux tournés vers Namek et Petit coeur
                dsqjkdnjkqs
            </p>
            <div>
                {cities.map((c) =>
                    <h1>{c.name}</h1>
                )}
            </div>
        </div>
    );
}

export default App;
