import { Route, Routes, useSearchParams } from "react-router-dom";
import CSS from "csstype";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Header from "./components/Header";
import ManageCities from "./screens/ManageCities";
import ManageUsers from "./screens/ManageUsers";
import Map from "./components/Map";
import "./App.css";
import { useCitiesQuery } from "./gql/generated/schema";
import Register from "./screens/Register";
import PasswordReset from "./screens/PasswordReset";
import EmailPassword from "./screens/EmailPassword";
import InfoCity from "./screens/InfoCity";
import { useState } from "react";
import { useLocation } from "react-router";
import EditCity from "./screens/EditCity";
import CitiesList from "./screens/CitiesList";
import Admin from "./screens/Admin";
import ManageCategories from "./screens/ManageCategories";
import IState from "./interfaces/IState";
import { Toaster } from "react-hot-toast";

const styles: CSS.Properties = {
  margin: 0,
  backgroundSize: "100vw",
};

function App() {
  const { data } = useCitiesQuery();

  const currentUrl = useLocation().pathname;

  const cities = data?.cities ?? [];

  const [searchParams, setSearchParams] = useSearchParams();

  const [state, setState] = useState<IState>({
    query: searchParams.get("query") ?? "",
    list: [],
  });

  // takes in value from the search bar and returns a filtered list of the cities to display
  //(filter improves with each letter)
  //searchParams controls the URL (what comes after the "?")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const results = cities.filter((city) => {
      if (e.target.value === " ") return cities;
      return city.name.toLowerCase().includes(e.target.value.toLowerCase());
    });

    setSearchParams({ query: e.target.value });

    setState({
      query: e.target.value,
      list: results,
    });
  };

  return (
    <>
      <Toaster position="top-center" />
      <div style={styles}>
        <Header
          currentUrl={currentUrl}
          state={state}
          handleChange={handleChange}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password/email" element={<EmailPassword />} />
          <Route
            path="/password/reset/:id/:token"
            element={<PasswordReset />}
          />
          <Route path="/cities-list" element={<CitiesList state={state} />} />
          <Route path="/info/:cityName" element={<InfoCity />} />
          <Route path="/manage-cities" element={<ManageCities />} />
          <Route path="/edit-city/:cityName" element={<EditCity />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/manage-categories" element={<ManageCategories />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
