import { InputType, Field } from "type-graphql"
import { Project } from "./project.type"

@InputType()
export class ProjectInput implements Project {
  @Field()
  id!: number

  @Field()
  ipfsCid!: string

  @Field()
  artistAddress!: string

  @Field()
  timeOfMint!: Date
}
