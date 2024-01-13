/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `chessCOMUserName` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "chessCOMUserName" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "ChessCOMUser" (
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ChessCOMUser_name_key" ON "ChessCOMUser"("name");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_chessCOMUserName_fkey" FOREIGN KEY ("chessCOMUserName") REFERENCES "ChessCOMUser"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
