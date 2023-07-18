import { useCitiesQuery, useGetProfileQuery } from "../gql/generated/schema";

export default function AddUserCity({
  handleOpenModal,
  onClickAssignCity,
  displayUserCities,
  selectedUser,
  refetch,
  role,
}: any) {
  const { data } = useCitiesQuery();

  const cities = data?.cities ?? [];

  function handleOnClickAssignCity(
    cityId: number,
    cityName: string,
    selectedUserId: number,
    selectedUserEmail: string
  ) {
    onClickAssignCity(cityId, cityName, selectedUserId, selectedUserEmail);
    //refetch()
  }

  console.log("displayuserCities", displayUserCities?.cityById.name);

  return (
    <div
      style={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(50, 74, 168, 0.5)",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        top: "20%",
      }}
    >
      <p>Villes:{displayUserCities?.cityById.name}</p>
      <ul>
        {cities.map((city) => {
          return (
            <li key={city.name} style={{ border: "1px solid black" }}>
              <option value={city.name}>{city.name} </option>
              <button
                onClick={() =>
                  handleOnClickAssignCity(
                    city.id,
                    city.name,
                    selectedUser.id,
                    selectedUser.email
                  )
                }
                style={{ all: "unset" }}
              >
                Select
              </button>
            </li>
          );
        })}
      </ul>
      <button onClick={() => handleOpenModal()}>Close</button>
    </div>
  );
}
