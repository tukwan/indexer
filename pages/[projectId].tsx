import Image from "next/image"
import { getProjectById } from "@/lib/api"
import { Project } from "@/lib/gql"
import { ipfsToUrl } from "@/lib/utils"
import { Spinner } from "@/components/Spinner"
import { useDateTime } from "@/hooks/useDateTime"

type ProjectMetadata = {
  name: string
  description: string
  tags: string[]
  thumbnailUri: string
}

export default function ProjectDetail({
  project,
  metadata,
}: {
  project: Project
  metadata: ProjectMetadata
}) {
  const timeOfMintLocal = useDateTime(project.timeOfMint)

  if (!project || !metadata) return <Spinner title="Loading a project..." />

  const { name, description, tags, thumbnailUri } = metadata

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="rounded-lg shadow-lg overflow-hidden">
        <div className="bg-white p-6">
          <Image
            src={ipfsToUrl(thumbnailUri)}
            alt={name}
            width={400}
            height={400}
            className="w-full object-cover h-48 rounded mb-6"
          />
          <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
          <p className="mt-2 text-sm text-gray-600">{description}</p>

          <div className="mt-4 space-x-2">
            {tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-2"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="space-y-1 text-sm font-medium text-gray-900">
              <p>Project ID:</p>
              <p>Artist address:</p>
              <p>Time of mint:</p>
            </div>

            <div className="space-y-1 text-sm text-gray-600">
              <p className="font-bold">{project.id}</p>
              <p className="overflow-hidden overflow-ellipsis">
                <a
                  href={`https://tzkt.io/${project.artistAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 "
                >
                  {project.artistAddress}
                </a>
              </p>
              <p>{timeOfMintLocal}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({
  params,
}: {
  params: { projectId: string }
}) {
  const { project } = await getProjectById({ id: params.projectId })
  const url = ipfsToUrl(project?.ipfsCid!)
  const res = await fetch(url)
  const metadata = await res.json()

  return {
    props: {
      project,
      metadata,
    },
  }
}
