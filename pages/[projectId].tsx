import { dehydrate, useQuery } from "@tanstack/react-query"
import { queryClient, getProjectById } from "../lib/api"

export default function ProjectDetail({ id }) {
  const { data, isLoading } = useQuery(["project"], () =>
    getProjectById({ id })
  )

  if (isLoading) return "Loading..."

  return <div>{JSON.stringify(data)}</div>
}

export async function getServerSideProps({ params }) {
  await queryClient.prefetchQuery(["project"], () =>
    getProjectById({ id: params.projectId })
  )

  return {
    props: {
      id: params.projectId,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
