import { Field, ObjectType, ID } from "type-graphql"

@ObjectType()
export class Project {
  @Field((type) => ID)
  readonly id: number

  @Field()
  ipfsCid!: string

  @Field()
  artistAddress!: string

  @Field()
  timeOfMint!: Date
}
