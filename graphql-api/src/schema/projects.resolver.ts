import {
  Resolver,
  Query,
  Arg,
  ID,
  Ctx,
  Mutation,
  InputType,
  Field,
} from "type-graphql"
import { Project } from "./projects.js"
import { prisma } from "../prismaClient.js"

@InputType()
class ProjectInput implements Project {
  @Field()
  id!: string

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
  async projects(@Ctx() context: any): Promise<Project[] | unknown> {
    return await prisma.project.findMany()
  }

  @Query(() => Project, { nullable: true })
  async project(@Arg("id", () => ID) id: number): Promise<Project | unknown> {
    const project = await prisma.project.findUnique({
      where: { id },
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
      newProject = await prisma.project.create({
        data: { ...projectInput, ...{ id: parseInt(projectInput.id) } },
      })
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
