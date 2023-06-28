import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class Project {
  @Field()
  id!: number

  @Field()
  ipfsCid!: string

  @Field()
  artistAddress!: string

  @Field()
  timeOfMint!: Date
}
