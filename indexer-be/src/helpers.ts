import dotenv from "dotenv"

dotenv.config()

const MAX_RETRY = 20
const TIMEOUT = 2000
const GRAPHQL_API_HEALTH_CHECK = `${process.env.GRAPHQL_API_URL}?query=%7B__typename%7D`

export async function checkAPIConnection(retry = 0): Promise<void> {
  try {
    await fetch(GRAPHQL_API_HEALTH_CHECK)
    console.log("Connection successful!")
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

const convertIpfsUrl = (ipfsUrl: string): string => {
  const hash = ipfsUrl.split("ipfs://")[1]
  return `https://ipfs.io/ipfs/${hash}`
}

async function fetchData() {
  try {
    // @ts-ignore
    const url = convertIpfsUrl(result[0].metadataIpfs)

    const response = await fetch(url)
    const data = await response.json()

    console.log(data)
  } catch (error) {
    console.error("Error fetching data from IPFS:", error)
  }
}

// fetchData()
