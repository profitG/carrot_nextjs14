-- CreateTable
CREATE TABLE "SMSToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "userid" INTEGER NOT NULL,
    CONSTRAINT "SMSToken_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "SMSToken_token_key" ON "SMSToken"("token");
