import { useContext } from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  useQuery,
  gql,
} from "@apollo/client";
import AppServicesContext from "../realm/AppServicesContext";
