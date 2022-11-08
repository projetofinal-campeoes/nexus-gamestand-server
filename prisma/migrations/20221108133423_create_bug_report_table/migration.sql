-- CreateTable
CREATE TABLE "bug_report" (
    "id" TEXT NOT NULL,
    "page" VARCHAR(24) NOT NULL,
    "description" VARCHAR(256) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "bug_report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bug_report" ADD CONSTRAINT "bug_report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
