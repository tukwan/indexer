import dotenv from "dotenv"
import * as R from "ramda"
import {
  operationsGetTransactions,
  operationsGetTransactionByHash,
} from "@tzkt/sdk-api"
import { GraphQLClient } from "graphql-request"
import { getSdk } from "./gql"
import { checkAPIConnection } from "./helpers"

dotenv.config()

const gqlClient = new GraphQLClient(process.env.GRAPHQL_API_URL || "")
export const { getProjects, createProject } = getSdk(gqlClient)

await checkAPIConnection()

const FX_CONTRACT = "KT1Xpmp15KfqoePNW9HczFmqaGNHwadV2a3b"
const ENTRY_POINT = "mint_issuer"

const projectsHashes = (await operationsGetTransactions({
  target: {
    eq: FX_CONTRACT,
  },
  entrypoint: {
    in: [ENTRY_POINT],
  },
  sort: {
    desc: "id",
  },
  limit: 5,
  select: {
    fields: ["hash"],
  },
})) as unknown as string[]

const projectsNumber = projectsHashes.length
let indexerCounter = 0

console.log(`Number of projects: ${projectsNumber}`)

function delay() {
  const ms = Math.random() * 5000
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const promises = projectsHashes.map(async (projectHash) => {
  await delay()
  const rawTxData = await operationsGetTransactionByHash(projectHash)
  return processTxData(rawTxData)
})

await Promise.all(promises)

async function processTxData(txData: any) {
  const findLastIssuerMinted = R.pipe(
    R.pathOr([], ["diffs"]),
    R.find(R.path(["content", "value", "last_issuer_minted"])),
    R.pathOr("", ["content", "value", "last_issuer_minted"])
  )

  for (let item of txData) {
    const alias = R.path(["sender", "alias"], item)
    const address = R.path(["sender", "address"], item)
    const metadata = R.path(["parameter", "value", "metadata"], item)
    const last_issuer_minted = findLastIssuerMinted(item)
    const isMinterTx =
      item.timestamp && item.hash && address && metadata && last_issuer_minted

    if (isMinterTx) {
      const projectToSave = {
        timestamp: item.timestamp,
        hash: item.hash,
        alias,
        address,
        metadata,
        metadataIpfs: Buffer.from(metadata, "hex").toString("utf8"),
        last_issuer_minted,
      }

      try {
        await createProject({
          projectInput: {
            id: last_issuer_minted,
            artistAddress: address,
            ipfsCid: Buffer.from(metadata, "hex").toString("utf8"),
            timeOfMint: item.timestamp,
          },
        })
        indexerCounter++
      } catch (error) {
        console.log("Project ID error:", last_issuer_minted)
        console.log(error.response.errors[0].message)
      }

      console.log("Projects indexed: ", indexerCounter + " / " + projectsNumber)
    }
  }
}

console.log("Indexing finished.")
