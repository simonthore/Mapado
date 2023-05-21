import {useEffect, useState} from "react";
import {
    useCitiesQuery,
    useFetchCityNameMutation,
    useDeleteCityMutation, useGetCityQuery
} from "../gql/generated/schema";
import Card from "../components/Card";
import ICity from "../interfaces/ICity";
import AddPoi from "../components/AddPoi";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router";
import Badge from "../components/Badge";

export default function EditCity() {
    //
    // STATES
    //

    //
    // Navigation
    //
    const {cityName} = useParams();
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
    console.log(cityName)
    //
    // USE EFFECT
    //
    useEffect(() => {
        document.body.style.overflow = "scroll"
    })

    // Initialisation de l'objet cityRequested
    const [cityRequested, setCityRequested] = useState({
        cityName: "",
    });

    //
    // MUTATIONS GRAPHQL
    //

    // fonction gql qui récupère la valeur de l'input
    //REFETCH POSSIBLE ICI
    const [sendCityName] = useFetchCityNameMutation();
    const [deleteCity] = useDeleteCityMutation();
    const {loading, data} = useGetCityQuery({
        variables: {query: cityName!},
    });
    const city: ICity = {
        id: data?.city.id!,
        name: data?.city.name!,
        longitude: data?.city.longitude,
        latitude: data?.city.latitude,
        pois: [],
    };

    console.log(city)
    //
    // FONCTIONS ONCLICK
    //

    // Au click du bouton on lance la fonction gql
    const onClickSendCityName = () => {
        sendCityName({variables: {data: cityRequested}});
    };

    const onClickDeleteCity = (cityId: number) => {
        deleteCity({variables: {deleteCityId: cityId}});
    };


    return (
        <Card>
            <h1 className="cityLabel">{city.name}</h1>
            <button className={"backButton"} onClick={goBack}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                    <path d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z"/>
                </svg>
            </button>
            <div className={"addPoi_InputsContainer"}>
                <h2 className={"title"}>Ajouter un point d'intérêt</h2>
                <AddPoi cityId={city.id} cityName={city.name}></AddPoi>
            </div>
            <div className={"editCity_InputsContainer"}>
                <h2 className={"title"}>Modifier la ville</h2>
                <form className={"editCity_form"}>
                    <div className={"editCity_form_inputContainer"}>
                        <label id={"name"}>Nom</label>
                        <input
                            type="text"
                            placeholder={city.name}
                            value={cityRequested.cityName}
                            onChange={(e) => setCityRequested({cityName: e.target.value})}
                        />
                    </div>

                    <div className={"editCity_form_inputContainer"}>

                        <label id={"name"}>Longitude</label>
                        <input
                            type="text"
                            placeholder={city.longitude?.toString()}
                            value={cityRequested.cityName}
                            onChange={(e) => setCityRequested({cityName: e.target.value})}
                        />
                    </div>
                    <div className={"editCity_form_inputContainer"}>

                        <label id={"name"}>Latitude</label>
                        <input
                            type="text"
                            placeholder={city.latitude?.toString()}
                            value={cityRequested.cityName}
                            onChange={(e) => setCityRequested({cityName: e.target.value})}
                        />
                    </div>
                    {city.pois ? (
                        city.pois.map((poi) => (
                            <Badge text={poi.name}/>
                        ))
                    ) : null}
                </form>
            </div>
        </Card>
    );
}
