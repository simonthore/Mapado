import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import  {CookiesProvider }from "react-cookie";
import "./index.css";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import client from "./gql/client";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      {/* <CookiesProvider> */}
      <App />
      {/* </CookiesProvider> */}
    </BrowserRouter>
  </ApolloProvider>
);
