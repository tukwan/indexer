// export const formatDate = (dateString: string) =>
//   new Date(dateString).toUTCString()

export const ipfsToUrl = (ipfsUrl: string) =>
  `https://ipfs.io/ipfs/${ipfsUrl.split("ipfs://")[1]}`
