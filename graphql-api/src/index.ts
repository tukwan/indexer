import "reflect-metadata"
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { buildSchema } from "type-graphql"
import { ProjectResolver } from "./schema/project.resolver.js"

const schema = await buildSchema({
  resolvers: [ProjectResolver],
})

const server = new ApolloServer({
  schema,
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
})

console.log(`🚀  Server ready at: ${url}`)
