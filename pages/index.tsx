import { dehydrate, useQuery } from "@tanstack/react-query"
import { queryClient, getProjects } from "../lib/api"

export default function Home() {
  const { data, isLoading } = useQuery(["projects"], () => getProjects())

  if (isLoading) return "Loading..."

  return data?.projects.map(({ id, ipfsCid, artistAddress, timeOfMint }) => (
    <div key={id}>
      <p>
        {id}: {ipfsCid} by {artistAddress} at {timeOfMint}
      </p>
    </div>
  ))
}

export async function getServerSideProps() {
  await queryClient.prefetchQuery(["projects"], () => getProjects())

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
