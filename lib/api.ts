import { GraphQLClient } from "graphql-request"
import { QueryClient } from "@tanstack/react-query"
import { getSdk } from "./gql"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
})

const gqlClient = new GraphQLClient(process.env.GRAPHQL_API_URL || "")

export const { getProjects, getProjectById, createProject } = getSdk(gqlClient)
