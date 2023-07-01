export const ipfsToUrl = (ipfsUrl: string) =>
  `https://ipfs.io/ipfs/${ipfsUrl.split("ipfs://")[1]}`
