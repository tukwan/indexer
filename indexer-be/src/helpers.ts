import { getSdk, Project } from "./gql"
import { GraphQLClient } from "graphql-request"
import {
  MAX_RETRY,
  TIMEOUT,
  GRAPHQL_API_HEALTH_CHECK,
  GRAPHQL_API_URL,
} from "./constants"

const gqlClient = new GraphQLClient(GRAPHQL_API_URL || "")
const { createProject } = getSdk(gqlClient)

export async function addProjectToDatabase(project: Project) {
  try {
    await createProject({ projectInput: { ...project } })
  } catch (error) {
    console.log(error.response.errors[0].message)
  }
}

export async function checkAPIConnection(retry = 0): Promise<void> {
  try {
    await fetch(GRAPHQL_API_HEALTH_CHECK)
    console.log("Connection to API successful!")
  } catch (error) {
    retry += 1
    console.log(`Failed to connect on attempt: ${retry}`)
    if (retry < MAX_RETRY) {
      await new Promise((resolve) => setTimeout(resolve, TIMEOUT))
      return checkAPIConnection(retry)
    } else {
      throw new Error("Max retries reached. Exiting...")
    }
  }
}

export const delay = (ms = 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms))

// async function fetchData() {
//   try {
//     const url = convertIpfsUrl(result[0].metadataIpfs)

//     const response = await fetch(url)
//     const data = await response.json()

//     console.log(data)
//   } catch (error) {
//     console.error("Error fetching data from IPFS:", error)
//   }
// }

// const convertIpfsUrl = (ipfsUrl: string): string | null => {
//   if (!ipfsUrl.startsWith("ipfs://")) {
//     console.error("Invalid IPFS URL: " + ipfsUrl)
//     return null
//   }

//   const hash = ipfsUrl.split("ipfs://")[1]
//   return `https://ipfs.io/ipfs/${hash}`
// }
