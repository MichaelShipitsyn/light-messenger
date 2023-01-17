/*
  Warnings:

  - A unique constraint covering the columns `[messageId]` on the table `dialogs` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "dialogs" ADD COLUMN     "messageId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "dialogs_messageId_key" ON "dialogs"("messageId");

-- AddForeignKey
ALTER TABLE "dialogs" ADD CONSTRAINT "dialogs_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
