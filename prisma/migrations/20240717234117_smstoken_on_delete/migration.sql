-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SMSToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "userid" INTEGER NOT NULL,
    CONSTRAINT "SMSToken_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SMSToken" ("created_at", "id", "token", "updated_at", "userid") SELECT "created_at", "id", "token", "updated_at", "userid" FROM "SMSToken";
DROP TABLE "SMSToken";
ALTER TABLE "new_SMSToken" RENAME TO "SMSToken";
CREATE UNIQUE INDEX "SMSToken_token_key" ON "SMSToken"("token");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
