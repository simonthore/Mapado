import React, {useState} from 'react';
import {
    FindPoi,
    useCategoriesQuery,
    useFetchPoiCoordinatesMutation,
    useGetCityQuery,
} from "../gql/generated/schema";
import {ApolloError} from "@apollo/client";
import checkIcon from "../assets/svg/check.svg";
import errorIcon from "../assets/svg/error.svg";
import Toast from "./Toast";
import Rating from '@mui/material/Rating';

interface PoiProps {
    cityId: number;
    cityName: string;
}

interface PoiRequestedInterface {
    poiNameOrAdress: string;
    cityId: number;
    cityName: string;
    categoryId: number | null;
    description: string;
    rating: number | null;
}

interface ToastInterface {
    id: number;
    title: string;
    description: string;
    icon: string;
    backgroundColor: string;
}

export default function AddPoi({cityId, cityName}: PoiProps) {
    // Initialisation de l'objet poiRequested
    const [poiRequested, setPoiRequested] = useState<PoiRequestedInterface>({
        poiNameOrAdress: "",
        cityId: 0,
        cityName: "",
        categoryId: null,
        description: "",
        rating: null,
    });

    console.log(poiRequested)
    // Initialisation de l'objet Toast
    const [toastData, setToastData] = useState<ToastInterface>({
        id: 0,
        title: "",
        description: "",
        icon: "",
        backgroundColor: "",
    });
    const [showToast, setShowToast] = useState(false);

    const [sendPoiNameOrAddress] = useFetchPoiCoordinatesMutation();

    const {data} = useCategoriesQuery()
    const categories = data?.categories ?? [];


    const {refetch} = useGetCityQuery({
        variables: {query: cityName!},
    });

    const onClickSendNewPoi = () => {
        sendPoiNameOrAddress({variables: {data: poiRequested as FindPoi}})
            .then((res) => {
                /* console.log("log du then", res); */

                setToastData({
                    id: Math.floor(Math.random() * 100 + 1),
                    description: res?.data?.fetchPoiCoordinates!,
                    title: "Super ! 👍",
                    backgroundColor: "green",
                    icon: checkIcon,
                });
                /*  console.log("log de toastData au click après le set", toastData); */
            })
            .catch((erreur: ApolloError) => {
                /* console.log(erreur); */
                setToastData({
                    id: Math.floor(Math.random() * 100 + 1),
                    description: erreur.message,
                    title: "Oups... 🧐",
                    backgroundColor: "#bd2424",
                    icon: errorIcon,
                });
            })
            .finally(() => {
                setShowToast(true);
                refetch();
            });
    };

    return (
        <>
            <input
                type="text"
                placeholder="Nom ou Adresse du POI"
                value={poiRequested.poiNameOrAdress}
                onChange={(e) =>
                    setPoiRequested((prevState) => ({
                        ...prevState,
                        poiNameOrAdress: e.target.value,
                        cityId: cityId,
                        cityName: cityName,
                    }))
                }
            ></input>

            <label htmlFor="categories" className={"selectCategoryLabel"}>Catégorie</label>

            <select
                className="categorySelect"
                name="categories"
                id="categories"
                defaultValue=""
                onChange={(e) => {
                    console.log(e.target.value);
                    setPoiRequested((prevState) => ({
                        ...prevState,
                        categoryId: parseInt(e.target.value, 10),
                    }));
                }}
            >
                <option value="" disabled className="defaultValue">Catégorie du POI</option>
                {categories ? categories.map((category, index) => {
                    return (
                        <option
                            key={index}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    );
                }) : null}
                <option value=""></option>
            </select>

            <div className="poi_description">
                <textarea
                    name="description"
                    id="description"
                    placeholder="Description"
                    defaultValue=""
                    onChange={(e) =>
                        setPoiRequested((prevState) => ({
                            ...prevState,
                            description: e.target.value
                        }))
                    }
                />
            </div>
            <Rating
                name="half-rating"
                defaultValue={0}
                precision={0.5}
                className="rating-stars"
                onChange={(e) =>
                    setPoiRequested((prevState) => ({
                        ...prevState,
                        rating: (parseInt((e.target as HTMLInputElement).value, 10))
                    }))
                }
            />

            <button onClick={onClickSendNewPoi} className={"tertiaryButton"}>
                Ajouter
            </button>
            <Toast
                toast={toastData}
                position={"bottomRight"}
                autoDelete={true}
                autoDeleteTime={5000}
                visible={showToast}
                setVisible={setShowToast}
            />
        </>
    );
}
