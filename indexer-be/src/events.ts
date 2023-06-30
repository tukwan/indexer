import { EventsService } from "@tzkt/sdk-events"
const FX_CONTRACT = "KT1Xpmp15KfqoePNW9HczFmqaGNHwadV2a3b"

//@ts-ignore
global.self = global

const client = new EventsService({
  url: "https://api.tzkt.io/v1/events",
  reconnect: true,
})

// const sub = client.operations({ types: [ 'origination' ] })
//     .subscribe({ next: console.log });

// const sub = client
//   .operations({ types: ["origination"] })
//   .subscribe({ next: console.log })

// client.status().subscribe({ next: console.log })

let sub

const subscribeToFX = async function () {
  // sub = client.operations({ types: ["origination"] }).subscribe({
  //   next: (t) => {
  //     console.log("operations")
  //     console.log(t)
  //   },
  // })

  sub = client.operations({ address: FX_CONTRACT }).subscribe({
    next: (t) => {
      console.log("operations")
      console.log(t)
    },
  })

  client.events().subscribe({
    next: (e) => {
      console.log("events")
      console.log(e)
    },
  })
  client.status().subscribe({
    next: (s) => {
      console.log("status")
      console.log(s)
    },
  })
}

subscribeToFX()

// const unsubscribeFromTransfers = async function () {
//   sub.unsubscribe()
// }
