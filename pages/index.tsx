import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import { getProjects } from "@/lib/api"
import { Spinner } from "@/components/Spinner"
import { ProjectCard } from "@/components/ProjectCard"

// TODO: Pagination / infinite scroll
const MAX_PROJECTS_PER_PAGE = 50

export default function Projects() {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () =>
      getProjects({ take: MAX_PROJECTS_PER_PAGE, orderBy: "desc" }),
    refetchInterval: 1000, // TODO: Remove, for testing a cold start
  })

  if (isLoading) return <Spinner title="Loading projects..." />

  return (
    <div className="p-6 flex flex-wrap -m-4 overflow-hidden min-h-screen w-full">
      <div className="fixed right-4 top-4 p-1 bg-blue-500 text-white shadow-lg rounded-full text-center w-12 h-12 flex items-center justify-center border-2 border-blue-700 z-50">
        {data?.projects.length}
      </div>

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
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(["projects"], () =>
    getProjects({ take: MAX_PROJECTS_PER_PAGE, orderBy: "desc" })
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
