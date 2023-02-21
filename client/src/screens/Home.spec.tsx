import { render, screen } from "@testing-library/react";
import {ApolloProvider} from "@apollo/client";
import client from "../gql/client";
import { MemoryRouter } from 'react-router-dom';
import Home from "./Home";
import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";

test("renders Home page with cities displayed", () => {
  render(<ApolloProvider client={client}>
    <Home
      cities={[
        {
          id: 1,
          name: "Bordeaux",
          city_area: "44.8473900254569, -0.7188799313856008",
          //   photo: bordeaux,
          user: ["1", "2", "3"],
        },
        {
          id: 2,
          name: "Lille",
          city_area: "50.62976866778606, 3.04621070309212",
          //   photo: lille,
          user: ["4", "5", "6"],
        },
      ]}
    /></ApolloProvider>, {wrapper: MemoryRouter}
  );
});
