import { GraphQLClient } from "graphql-request"
import { QueryClient } from "@tanstack/react-query"
import { getSdk } from "../core-api/src/graphql/generated/gql"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
})

const gqlClient = new GraphQLClient("http://localhost:4000/graphql")

export const { getProjects, getProjectById} = getSdk(gqlClient)
