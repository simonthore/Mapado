import { useCitiesQuery, useDeleteCityMutation } from "../gql/generated/schema";
import Card from "../components/Card";
import ICity from "../interfaces/ICity";
import AddPoi from "../components/AddPoi";
import AddCity from "../components/AddCity";
import DeleteCity from "../components/DeleteCity";

export default function AddManageCities() {
  const { loading: loadingCities, data, refetch } = useCitiesQuery();
  const cities = data?.cities ?? [];

  return (
    <Card customClass={"registerCard"}>
      <h2 className={"title"}>Ajouter une ville</h2>
      <AddCity />
      <div className={"manageCitiesContainer"}>
        <h2 className={"title"}>Gérer les villes</h2>
        <div className="max-w-screen-xl mx-auto px-5">
          <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
            {cities.map((city: ICity, index: number) => {
              return (
                <div key={index} className="py-5">
                  <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                      <div className={" manageOneCityContainer"}>
                        <p className={"cityLabel"}>{city.name}</p>
                        <DeleteCity cityId={city.id} cityName={city.name} />
                      </div>
                      <span className="transition group-open:rotate-180">
                        <svg
                          fill="none"
                          height="24"
                          shapeRendering="geometricPrecision"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </summary>
                    <h2 className={"title"}>Ajouter un point d'intérêt</h2>
                    <AddPoi cityId={city.id} cityName={city.name}></AddPoi>
                  </details>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
