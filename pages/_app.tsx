import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { QueryClientProvider, Hydrate } from "@tanstack/react-query"
import { queryClient } from "../lib/api"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  )
}
