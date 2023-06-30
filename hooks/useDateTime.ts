import { useState, useEffect } from "react"

export function useDateTime(stamp: string) {
  const [dateTime, setDateTime] = useState("")

  useEffect(() => {
    setDateTime(new Date(stamp).toLocaleString())
  }, [stamp])

  return dateTime
}
