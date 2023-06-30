export const Spinner = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900 mb-4"></div>
      <p className="text-gray-600">{title}</p>
    </div>
  )
}
