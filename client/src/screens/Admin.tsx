import {useEffect, useState} from "react";
import {
    useCitiesQuery,
    useFetchCityNameMutation,
    useDeleteCityMutation,
    useCreateUserMutation,
    useFetchPoiCoordinatesMutation,
} from "../gql/generated/schema";
import Card from "../components/Card";
import ICity from "../interfaces/ICity";
import {Link, NavLink} from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from "react-router";
import Edit from "../assets/images/edit.gif"

export default function Admin() {
    //
    // STATES
    //
    const navigate = useNavigate();
    const [removeAnimation, setRemoveAnimation] = useState(false)
    const handleAnimation = () => {
        if(window.scrollY >= 10){
            setRemoveAnimation(true)
        }
    }

    window.addEventListener('scroll', handleAnimation)

    useEffect(() => {
        document.body.style.overflowY = "scroll"
        const timer = setTimeout(() => {
            setRemoveAnimation(true)
        }, 5000);
        return () => clearTimeout(timer);
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
    const {loading: loadingCities, data, refetch} = useCitiesQuery();
    const cities = data?.cities ?? [];

    //
    // FONCTIONS ONCLICK
    //

    // Au click navigation à la page précédente
    const goBack = () => {
        navigate(-1);
    }

    // Au click du bouton on lance la fonction gql
    const onClickSendCityName = () => {
        sendCityName({variables: {data: cityRequested}});
        console.log('click')
    };

    const onClickDeleteCity = (cityId: number) => {
        deleteCity({variables: {deleteCityId: cityId}});
    };


    return (
        <Card>
            <div className={"addCityContainer"}>
                <button className={"backButton"} onClick={goBack}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                        <path d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z"/>
                    </svg>
                </button>
                <h1 className={"title"}>Admin</h1>
                <NavLink to={`/manage-cities`} className="country_link">
                    Ville
                </NavLink>
                <NavLink to={`/manage-categories`} className="country_link">
                    Catégorie
                </NavLink>
            </div>
        </Card>
    );
}
