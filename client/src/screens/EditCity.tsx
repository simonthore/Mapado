import {useEffect, useState} from "react";
import {
    useCitiesQuery,
    useFetchCityNameMutation,
    useDeleteCityMutation, useGetCityQuery, useUpdateCityMutation
} from "../gql/generated/schema";
import Card from "../components/Card";
import ICity from "../interfaces/ICity";
import AddPoi from "../components/AddPoi";
import {Link, useParams} from "react-router-dom";
import {useNavigate} from "react-router";
import Badge from "../components/Badge";
import IPoi from "../interfaces/IPoi";
import Rocket from "../assets/images/rocket.gif"

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

    //
    // USE EFFECT
    //
    useEffect(() => {
        document.body.style.overflow = "scroll"
    })

    // Initialisation de l'objet cityRequested
    const [cityDataToUpdate, setCityDataToUpdate] = useState({
        name: "",
        longitude: "",
        latitude: "",
        pois: []
    });

    //
    // MUTATIONS GRAPHQL
    //

    // fonction gql qui récupère la valeur de l'input
    //REFETCH POSSIBLE ICI
    const [sendCityName] = useFetchCityNameMutation();
    const [deleteCity] = useDeleteCityMutation();
    const [updateCity] = useUpdateCityMutation()
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

    data?.city?.poi?.forEach((e) => {
        const poi: IPoi = {
            id: e.id,
            name: e.name,
            longitude: e.longitude!,
            latitude: e.latitude!,
            address: e.address,
        };
        city?.pois?.push(poi);
    });

    console.log(city)
    //
    // FONCTIONS ONCLICK
    //

    // Au click du bouton on lance la fonction gql
    // const onClickSendCityName = () => {
    //     sendCityName({variables: {data: cityRequested}});
    // };

    const onClickRemovePoi = (cityId: number) => {
        deleteCity({variables: {deleteCityId: cityId}});
    };

    const handleRemovePoi = (e:any, id: number) => {
        e.preventDefault()
        console.log(city.pois)

        if (city.pois) {
            const newPoiList = city.pois.filter(e => e.id !==id)
        }
    }



    return (
        <Card>
            <Link to={`/info/${city.name}`} className="cityInfo_link">
                <h1 className="cityLabel">{city.name}</h1>
                <img className={"rocket"} src={Rocket} alt="rocket"/>
            </Link>
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
                            value={cityDataToUpdate.name}
                            onChange={(e) =>
                                setCityDataToUpdate((prevState) => ({
                                    ...prevState,
                                    name: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div className={"editCity_form_inputContainer"}>

                        <label id={"name"}>Longitude</label>
                        <input
                            type="text"
                            placeholder={city.longitude?.toString()}
                            value={cityDataToUpdate.longitude}
                            onChange={(e) =>
                                setCityDataToUpdate((prevState) => ({
                                    ...prevState,
                                    longitude: e.target.value
                                }))
                            }/>
                    </div>
                    <div className={"editCity_form_inputContainer"}>
                        <label id={"name"}>Latitude</label>
                        <input
                            type="text"
                            placeholder={city.latitude?.toString()}
                            value={cityDataToUpdate.latitude}
                            onChange={(e) =>
                                setCityDataToUpdate((prevState) => ({
                                    ...prevState,
                                    latitude: e.target.value,
                                }))
                            }/>
                    </div>
                    {city.pois ? (<>
                            <label id={"name"}>Points d'intérêt</label>
                            {city.pois.map((poi) => (
                                <Badge key={poi.id} text={poi.name} functionOnClick={(e)=>handleRemovePoi(e,poi.id)}/>
                            ))}
                        </>

                    ) : null}
                </form>
            </div>
        </Card>
    );
}
