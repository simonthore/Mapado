import { useCitiesQuery, useDeleteCityMutation } from "../gql/generated/schema";
import { ApolloError } from "@apollo/client";

interface CityProps {
  cityName: string;
  cityId: number;
}

export default function DeleteCity({ cityId, cityName }: CityProps) {
  const [deleteCity] = useDeleteCityMutation();
  const { refetch } = useCitiesQuery();

  const onClickDeleteCity = (cityId: number) => {
    deleteCity({ variables: { deleteCityId: cityId } })
      .catch((erreur: ApolloError) => {})
      .finally(() => {
        refetch();
      });
  };

  return (
    <>
      <button
        className={"primaryButton"}
        onClick={(e) => onClickDeleteCity(cityId)}
      >
        Supprimer
      </button>
    </>
  );
}
