import { useDateTime } from "@/hooks/useDateTime"
import { Project } from "@/lib/gql"
import { ipfsToUrl } from "@/lib/utils"

export function ProjectCard({
  id,
  ipfsCid,
  artistAddress,
  timeOfMint,
}: Project) {
  const timeOfMintLocal = useDateTime(timeOfMint)

  return (
    <div key={id} className="lg:w-1/3 md:w-1/2 w-full p-4 mb-6">
      <div className="bg-white shadow-xl rounded-lg p-6 transform transition duration-500 ease-in-out hover:scale-105">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 leading-snug">
          <a
            href={`/${id}`}
            className="text-blue-500 hover:text-blue-700 font-bold border-b-2 border-gray-300"
          >
            Project: {id}
          </a>
        </h2>
        <p className="text-sm font-bold text-gray-800 overflow-hidden overflow-ellipsis w-full py-2">
          Metadata:
          <a
            href={ipfsToUrl(ipfsCid)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 font-medium ml-2"
          >
            {ipfsCid}
          </a>
        </p>
        <p className="text-sm font-bold text-gray-800 overflow-hidden overflow-ellipsis w-full py-2">
          Artist:
          <a
            href={`https://tzkt.io/${artistAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 font-medium ml-2"
          >
            {artistAddress}
          </a>
        </p>
        <p className="text-sm font-bold text-gray-800 overflow-hidden overflow-ellipsis w-full py-2">
          Time:{` `}
          <span className="font-medium">{timeOfMintLocal}</span>
        </p>
      </div>
    </div>
  )
}
