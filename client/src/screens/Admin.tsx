import Card from "../components/Card";
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router";

export default function Admin() {
    const navigate = useNavigate();

    // Au click navigation à la page précédente
    const goBack = () => {
        navigate(-1);
    }

    return (
        <Card>
            <div className={"addCityContainer admin_wrapper"}>
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
