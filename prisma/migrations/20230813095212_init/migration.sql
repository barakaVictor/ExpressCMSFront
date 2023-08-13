/*
  Warnings:

  - The primary key for the `Candidate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `electionId` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `positionId` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `Candidate` table. All the data in the column will be lost.
  - The primary key for the `Election` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `facultyId` on the `Election` table. All the data in the column will be lost.
  - The primary key for the `ElectivePosition` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Faculty` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Lecturer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `facultyId` on the `Lecturer` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Lecturer` table. All the data in the column will be lost.
  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `facultyId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Student` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `roleId` on the `User` table. All the data in the column will be lost.
  - The primary key for the `Vote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `candidateId` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the column `electionId` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the column `electionPositionId` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the column `voterId` on the `Vote` table. All the data in the column will be lost.
  - The primary key for the `Voter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Voter` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Candidate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentSlug,electionSlug]` on the table `Candidate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Election` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `ElectivePosition` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Faculty` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Lecturer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[voterSlug,electionPositionSlug,electionSlug]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userSlug]` on the table `Voter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Voter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `electionSlug` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `positionSlug` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentSlug` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Election` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `ElectivePosition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Faculty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Lecturer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userSlug` to the `Lecturer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userSlug` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `candidateSlug` to the `Vote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `electionPositionSlug` to the `Vote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `electionSlug` to the `Vote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Vote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voterSlug` to the `Vote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Voter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userSlug` to the `Voter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_electionId_fkey";

-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_positionId_fkey";

-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Election" DROP CONSTRAINT "Election_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "Lecturer" DROP CONSTRAINT "Lecturer_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "Lecturer" DROP CONSTRAINT "Lecturer_userId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_electionId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_electionPositionId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_voterId_fkey";

-- DropForeignKey
ALTER TABLE "Voter" DROP CONSTRAINT "Voter_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ElectionToElectivePosition" DROP CONSTRAINT "_ElectionToElectivePosition_A_fkey";

-- DropForeignKey
ALTER TABLE "_ElectionToElectivePosition" DROP CONSTRAINT "_ElectionToElectivePosition_B_fkey";

-- DropIndex
DROP INDEX "Candidate_studentId_electionId_key";

-- DropIndex
DROP INDEX "Vote_voterId_electionPositionId_electionId_key";

-- DropIndex
DROP INDEX "Voter_userId_key";

-- AlterTable
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_pkey",
DROP COLUMN "electionId",
DROP COLUMN "positionId",
DROP COLUMN "studentId",
ADD COLUMN     "electionSlug" TEXT NOT NULL,
ADD COLUMN     "positionSlug" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "studentSlug" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Candidate_id_seq";

-- AlterTable
ALTER TABLE "Election" DROP CONSTRAINT "Election_pkey",
DROP COLUMN "facultyId",
ADD COLUMN     "facultySlug" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Election_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Election_id_seq";

-- AlterTable
ALTER TABLE "ElectivePosition" DROP CONSTRAINT "ElectivePosition_pkey",
ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ElectivePosition_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ElectivePosition_id_seq";

-- AlterTable
ALTER TABLE "Faculty" DROP CONSTRAINT "Faculty_pkey",
ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Faculty_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Faculty_id_seq";

-- AlterTable
ALTER TABLE "Lecturer" DROP CONSTRAINT "Lecturer_pkey",
DROP COLUMN "facultyId",
DROP COLUMN "userId",
ADD COLUMN     "facultySlug" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "userSlug" TEXT NOT NULL,
ADD CONSTRAINT "Lecturer_pkey" PRIMARY KEY ("userSlug");

-- AlterTable
ALTER TABLE "Role" DROP CONSTRAINT "Role_pkey",
ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Role_id_seq";

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
DROP COLUMN "facultyId",
DROP COLUMN "userId",
ADD COLUMN     "facultySlug" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "userSlug" TEXT NOT NULL,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("userSlug");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "roleId",
ADD COLUMN     "roleSlug" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_pkey",
DROP COLUMN "candidateId",
DROP COLUMN "electionId",
DROP COLUMN "electionPositionId",
DROP COLUMN "voterId",
ADD COLUMN     "candidateSlug" TEXT NOT NULL,
ADD COLUMN     "electionPositionSlug" TEXT NOT NULL,
ADD COLUMN     "electionSlug" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "voterSlug" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Vote_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Vote_id_seq";

-- AlterTable
ALTER TABLE "Voter" DROP CONSTRAINT "Voter_pkey",
DROP COLUMN "userId",
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "userSlug" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Voter_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Voter_id_seq";

-- AlterTable
ALTER TABLE "_ElectionToElectivePosition" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_slug_key" ON "Candidate"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_studentSlug_electionSlug_key" ON "Candidate"("studentSlug", "electionSlug");

-- CreateIndex
CREATE UNIQUE INDEX "Election_slug_key" ON "Election"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ElectivePosition_slug_key" ON "ElectivePosition"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_slug_key" ON "Faculty"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Lecturer_slug_key" ON "Lecturer"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Role_slug_key" ON "Role"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Student_slug_key" ON "Student"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_slug_key" ON "User"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_slug_key" ON "Vote"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_voterSlug_electionPositionSlug_electionSlug_key" ON "Vote"("voterSlug", "electionPositionSlug", "electionSlug");

-- CreateIndex
CREATE UNIQUE INDEX "Voter_userSlug_key" ON "Voter"("userSlug");

-- CreateIndex
CREATE UNIQUE INDEX "Voter_slug_key" ON "Voter"("slug");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleSlug_fkey" FOREIGN KEY ("roleSlug") REFERENCES "Role"("slug") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userSlug_fkey" FOREIGN KEY ("userSlug") REFERENCES "User"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_facultySlug_fkey" FOREIGN KEY ("facultySlug") REFERENCES "Faculty"("slug") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecturer" ADD CONSTRAINT "Lecturer_userSlug_fkey" FOREIGN KEY ("userSlug") REFERENCES "User"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecturer" ADD CONSTRAINT "Lecturer_facultySlug_fkey" FOREIGN KEY ("facultySlug") REFERENCES "Faculty"("slug") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Election" ADD CONSTRAINT "Election_facultySlug_fkey" FOREIGN KEY ("facultySlug") REFERENCES "Faculty"("slug") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_studentSlug_fkey" FOREIGN KEY ("studentSlug") REFERENCES "Student"("userSlug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_positionSlug_fkey" FOREIGN KEY ("positionSlug") REFERENCES "ElectivePosition"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_electionSlug_fkey" FOREIGN KEY ("electionSlug") REFERENCES "Election"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voter" ADD CONSTRAINT "Voter_userSlug_fkey" FOREIGN KEY ("userSlug") REFERENCES "User"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_voterSlug_fkey" FOREIGN KEY ("voterSlug") REFERENCES "Voter"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_electionPositionSlug_fkey" FOREIGN KEY ("electionPositionSlug") REFERENCES "ElectivePosition"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_candidateSlug_fkey" FOREIGN KEY ("candidateSlug") REFERENCES "Candidate"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_electionSlug_fkey" FOREIGN KEY ("electionSlug") REFERENCES "Election"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ElectionToElectivePosition" ADD CONSTRAINT "_ElectionToElectivePosition_A_fkey" FOREIGN KEY ("A") REFERENCES "Election"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ElectionToElectivePosition" ADD CONSTRAINT "_ElectionToElectivePosition_B_fkey" FOREIGN KEY ("B") REFERENCES "ElectivePosition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
