import dotenv from "dotenv"

dotenv.config()

export const FX_CONTRACT = "KT1Xpmp15KfqoePNW9HczFmqaGNHwadV2a3b"
export const ENTRY_POINT = "mint_issuer"
export const MAX_PROJECTS_NUMBER_TO_INDEX = 30 // API limit: 10 000
export const MAX_RETRY = 20
export const TIMEOUT = 2000
export const GRAPHQL_API_URL = process.env.GRAPHQL_API_URL
export const GRAPHQL_API_HEALTH_CHECK = `${GRAPHQL_API_URL}?query=%7B__typename%7D`
