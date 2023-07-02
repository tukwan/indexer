import { GraphQLClient } from "graphql-request"
import { getSdk } from "./gql"

const gqlClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_API_URL || ""
)

export const { getProjects, getProjectById, createProject } = getSdk(gqlClient)
