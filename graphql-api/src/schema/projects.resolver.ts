import {
  Resolver,
  Query,
  Arg,
  ID,
  Mutation,
  InputType,
  Field,
} from "type-graphql"
import { Project } from "./projects.js"
import { prisma } from "../prismaClient.js"

@InputType()
class ProjectInput implements Project {
  @Field()
  id!: number

  @Field()
  ipfsCid!: string

  @Field()
  artistAddress!: string

  @Field()
  timeOfMint!: Date
}

@Resolver(Project)
export class ProjectResolver {
  @Query(() => [Project])
  async projects(): Promise<Project[] | unknown> {
    // TODO: add limit and offset
    return await prisma.project.findMany()
  }

  @Query(() => Project, { nullable: true })
  async project(@Arg("id", () => ID) id: string): Promise<Project | unknown> {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
    })
    if (!project) throw new Error("Project not found")
    return project
  }

  @Mutation(() => Project)
  async createProject(
    @Arg("projectInput") projectInput: ProjectInput
  ): Promise<Project | unknown> {
    let newProject

    try {
      newProject = await prisma.project.create({ data: projectInput })
    } catch (error) {
      if (error.code === "P2002") {
        throw new Error("Project already indexed, skipping...")
      } else {
        throw error
      }
    }

    return newProject
  }
}
