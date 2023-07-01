import { Resolver, Query, Arg, ID, Mutation, Int } from "type-graphql"
import { Project } from "./project.type.js"
import { prisma } from "../prismaClient.js"
import { ProjectInput } from "./project.input.js"

@Resolver(Project)
export class ProjectResolver {
  @Query(() => [Project, { nullable: true }])
  async projects(
    @Arg("skip", () => Int, { defaultValue: 0 }) skip: number,
    @Arg("take", () => Int, { defaultValue: 100 }) take: number,
    @Arg("orderBy", () => String, { defaultValue: "asc" }) orderBy: string
  ): Promise<Project[] | unknown> {
    return await prisma.project.findMany({
      skip: skip,
      take: take,
      orderBy: {
        id: orderBy as "asc" | "desc",
      },
    })
  }

  @Query(() => Project, { nullable: true })
  async project(@Arg("id", () => ID) id: string): Promise<Project | unknown> {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
    })
    // TODO: handle errors
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
