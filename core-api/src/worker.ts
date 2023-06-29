import * as R from "ramda"
import {
  operationsGetTransactions,
  operationsGetTransactionByHash,
} from "@tzkt/sdk-api"
import { GraphQLClient } from "graphql-request"
import { getSdk } from "./graphql/generated/gql"

const gqlClient = new GraphQLClient("http://localhost:4000/graphql")
export const { getProjects, createProject } = getSdk(gqlClient)

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
        console.log("id error:", last_issuer_minted)
        console.log("Error:", error)
      }

      console.log("Projects: ", indexerCounter + " / " + projectsNumber)
    }
  }
}

const convertIpfsUrl = (ipfsUrl: string): string => {
  const hash = ipfsUrl.split("ipfs://")[1]
  return `https://ipfs.io/ipfs/${hash}`
}

async function fetchData() {
  try {
    const url = convertIpfsUrl(result[0].metadataIpfs)

    const response = await fetch(url)
    const data = await response.json()

    console.log(data)
  } catch (error) {
    console.error("Error fetching data from IPFS:", error)
  }
}

// fetchData()
