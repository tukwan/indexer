import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const project1 = await prisma.project.create({
    data: {
      id: 1,
      ipfsCid: "ipfsCid_1",
      artistAddress: "artistAddress_1",
      timeOfMint: new Date("2023-06-28T10:51:50Z"),
    },
  })

  const project2 = await prisma.project.create({
    data: {
      id: 2,
      ipfsCid: "ipfsCid_2",
      artistAddress: "artistAddress_2",
      timeOfMint: new Date("2020-01-28T10:51:50Z"),
    },
  })

  console.log({ project1, project2 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
