-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL,
    "ipfsCid" TEXT NOT NULL,
    "artistAddress" TEXT NOT NULL,
    "timeOfMint" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
