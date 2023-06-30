import * as R from "ramda"
import { EventsService } from "@tzkt/sdk-events"
import { FX_CONTRACT } from "./constants"

//@ts-ignore
global.self = global

const client = new EventsService({
  url: "https://api.tzkt.io/v1/events",
  reconnect: true,
})

export const subscribeToFXContract = async function () {
  const sub = client.operations({ address: FX_CONTRACT }).subscribe({
    next: (t) => {
      // TODO: Check and add to database
      const entryPoint = R.pathOr("new operation", [
        "data",
        "parameter",
        "entrypoint",
      ])(t)
      console.log("FX contract: " + entryPoint)
    },
  })

  client.events().subscribe({
    next: (e) => {
      // console.log('events: ',  e)
    },
  })
  client.status().subscribe({
    next: (s) => {
      console.log("Subscribing to FX Contract: " + s)
    },
  })
}

// const unsubscribe = async function () {
//   sub.unsubscribe()
// }
