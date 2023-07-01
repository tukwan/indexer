import * as R from "ramda"
import {
  operationsGetTransactions,
  operationsGetTransactionByHash,
} from "@tzkt/sdk-api"
import { checkAPIConnection, delay, addProjectToDatabase } from "./utils"
import {
  FX_CONTRACT,
  ENTRY_POINT,
  MAX_PROJECTS_NUMBER_TO_INDEX,
} from "./constants"
import { subscribeToFXContract } from "./subscription"
import { Project } from "./gql"

await checkAPIConnection() // Check if graphql-api is up

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
  limit: MAX_PROJECTS_NUMBER_TO_INDEX,
  select: {
    fields: ["hash"],
  },
})) as unknown as string[]

let indexerCounter = 0
const projectsNumber = projectsHashes.length

console.log(`Number of projects to index: ${projectsNumber}`)

subscribeToFXContract()

await processProjects(projectsHashes)

async function processProjects(projectsHashes) {
  for (const projectHash of projectsHashes) {
    await delay()
    const rawTxData = await operationsGetTransactionByHash(projectHash)
    processTxData(rawTxData)
  }
}

async function processTxData(txData: any) {
  const findLastIssuerMinted = R.pipe(
    R.pathOr([], ["diffs"]),
    R.find(R.path(["content", "value", "last_issuer_minted"])),
    R.pathOr("", ["content", "value", "last_issuer_minted"])
  )

  for (let item of txData) {
    const address = R.path(["sender", "address"], item)
    const metadata = R.path(["parameter", "value", "metadata"], item)
    const last_issuer_minted = findLastIssuerMinted(item)
    const isMinterTx =
      item.timestamp && item.hash && address && metadata && last_issuer_minted

    if (isMinterTx) {
      console.log("Project id:", last_issuer_minted)

      const project: Project = {
        id: parseInt(last_issuer_minted),
        artistAddress: address,
        ipfsCid: Buffer.from(metadata, "hex").toString("utf8"),
        timeOfMint: item.timestamp,
      }

      addProjectToDatabase(project)

      console.log("Indexing:", ++indexerCounter + " / " + projectsNumber)
    }
  }
}

console.log("Indexing finished.")
console.log("\nListening for new FX Contract operations. Exit with Ctrl+C.\n")
