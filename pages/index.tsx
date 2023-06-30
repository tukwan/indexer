import { dehydrate, useQuery } from "@tanstack/react-query"
import { queryClient, getProjects } from "@/lib/api"
import { Spinner } from "@/components/Spinner"
import { ProjectCard } from "@/components/ProjectCard"

export default function Projects() {
  const { data, isLoading } = useQuery(["projects"], () => getProjects())

  if (isLoading) return <Spinner title="Loading projects..." />

  return (
    <div className="p-6 flex flex-wrap -m-4 overflow-hidden min-h-screen w-full">
      {data?.projects.map(({ id, ipfsCid, artistAddress, timeOfMint }) => {
        return (
          <ProjectCard
            key={id}
            id={id}
            ipfsCid={ipfsCid}
            artistAddress={artistAddress}
            timeOfMint={timeOfMint}
          />
        )
      })}
    </div>
  )
}

export async function getServerSideProps() {
  await queryClient.prefetchQuery(["projects"], () => getProjects())

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
