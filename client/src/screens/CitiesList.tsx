import {useEffect} from "react";
import {NavLink} from "react-router-dom";
import AnimatedCard from "../components/AnimatedCard";
import ICity from "../interfaces/ICity";
import IState from "../interfaces/IState";
import {useCitiesQuery} from "../gql/generated/schema";

interface CitiesListProps {
    state: IState;
}

export default function CitiesList({state}: CitiesListProps) {
    // gets the params from URL
    const {data} = useCitiesQuery();

    const cities = data?.cities ?? [];

    useEffect(() => {
        document.body.style.overflow = "auto";
    });

    return (
        <>
            <div className="citiesList_container">
                <section className="citiesList_wrapper">
                    {state.query === ""
                        ? // if there is no search, display all cities
                        cities.map((city: ICity) => (
                            <NavLink
                                className="cardLink"
                                key={city.id}
                                to={`/info/${city.name}`}
                            >
                                <AnimatedCard
                                    key={city.id}
                                    cityName={city.name}
                                    cityPhoto={city.photo}
                                />
                            </NavLink>
                        ))
                        : state.list.map((city: ICity) => (
                            // if there is a search display the cities corresponding
                            <NavLink
                                className="cardLink"
                                key={city.id}
                                to={`/info/${city.name}`}
                            >
                                <AnimatedCard
                                    key={city.id}
                                    cityName={city.name}
                                    cityPhoto={city.photo}
                                />
                            </NavLink>
                        ))}
                </section>
            </div>
        </>
    );
}
