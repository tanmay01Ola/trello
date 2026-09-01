-- CreateTable
CREATE TABLE "Invites" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Invites_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invites" ADD CONSTRAINT "Invites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
