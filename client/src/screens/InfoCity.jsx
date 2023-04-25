import Map from "../screens/Map";
import {useParams} from "react-router-dom";
import {useGetCityQuery} from "../gql/generated/schema";
import {Marker, Popup, TileLayer} from "react-leaflet";

export default function InfoCity() {
    const {cityName} = useParams();

    const {loading: loadingCities, data} = useGetCityQuery({variables: {query: cityName}})

    const city = data?.city ?? [];
    const pois = city.poi
    console.log(pois)

    return (
        <div>
            <Map longitude={city.longitude} latitude={city.latitude}>
                {pois ? pois.map((e)=>
                    <Marker position={[e.latitude, e.longitude]}>
                        <Popup>
                            {e.name}<br /> {e.address}.
                        </Popup>
                    </Marker>)
                    : null}
            </Map>
        </div>
    )
}
;
