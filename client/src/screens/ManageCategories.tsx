import {useEffect, useState} from "react";
import {
    useCategoriesQuery, useCreateCategoryMutation
} from "../gql/generated/schema";
import Card from "../components/Card";
import {useNavigate} from "react-router";
import ICategory from "../interfaces/ICategory";
import Badge from "../components/Badge";

export default function AddManageCities() {
    //
    // STATES
    //
    const navigate = useNavigate();
    const [newCategory, setNewCategory] = useState({name: ""},)
    console.log(newCategory)
    //
    // MUTATIONS GRAPHQL
    //

    // fonction gql qui récupère la valeur de l'input
    //REFETCH POSSIBLE ICI
    const [sendNewCategory] = useCreateCategoryMutation({
        // Après avoir effectué la mutation, appel à refetch pour réactualiser les catégories
        onCompleted: () => refetch(),
    });
    const {loading: loadingCities, data, refetch} = useCategoriesQuery();

    const categories = data?.categories ?? [];

    //
    // FONCTIONS ONCLICK
    //

    // Au click du bouton, on lance la fonction sendNewCategory for utilisé la mutation gql et créer une nouvelle catégorie
    const onClickSendCategory = () => {
        sendNewCategory({variables: {data: newCategory}});
    };

    // Au click navigation à la page précédente
    const goBack = () => {
        navigate(-1);
    }


    return (
        <Card>
            <div className={"addCityContainer"}>
                <button className={"backButton"} onClick={goBack}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                        <path d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z"/>
                    </svg>
                </button>
                <h2 className={"title"}>Ajouter une catégorie</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Nom de la catégorie"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({name: e.target.value})}
                    />
                    <button
                        onClick={onClickSendCategory}
                        className={"tertiaryButton"}>
                        Ajouter
                    </button>
                </div>
            </div>

            <div className={"manageCitiesContainer"}>
                <h2 className={"title"}>Gérer les catégories</h2>
                <div className="categories_badges_container">
                    {categories.map((category: ICategory, index: number) => {
                        return (
                            <Badge text={category.name} key={index}/>
                        );
                    })}
                </div>
            </div>
        </Card>
    );
}
