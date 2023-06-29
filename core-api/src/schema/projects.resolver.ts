import { Resolver, Query, Arg, ID } from "type-graphql"
import { Project } from "./projects.js"

const mockedProjects: Project[] = [
  {
    id: "1",
    ipfsCid: "ipfsCid_1",
    artistAddress: "artistAddress_1",
    timeOfMint: new Date("2023-06-28T10:51:50Z"),
  },
  {
    id: "2",
    ipfsCid: "ipfsCid_2",
    artistAddress: "artistAddress_2",
    timeOfMint: new Date("2020-01-28T10:51:50Z"),
  },
]

@Resolver(Project)
export class ProjectResolver {
  @Query(() => [Project])
  projects(): Project[] {
    return mockedProjects
  }

  @Query(() => Project, { nullable: true })
  project(@Arg("id", () => ID) id: string): Project | undefined {
    const project = mockedProjects.find((project) => project.id === id)
    if (!project) throw new Error("Project not found")
    return project
  }
}
