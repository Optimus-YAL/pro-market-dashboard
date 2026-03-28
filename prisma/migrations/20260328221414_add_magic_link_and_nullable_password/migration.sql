-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT,
    "magicLinkToken" TEXT,
    "magicLinkExpiry" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "maxTradesPerDay" INTEGER NOT NULL DEFAULT 3,
    "maxDailyLoss" REAL NOT NULL DEFAULT 1500,
    "lockAfterLosses" INTEGER NOT NULL DEFAULT 2,
    "defaultPreset" TEXT NOT NULL DEFAULT 'default',
    "timezone" TEXT NOT NULL DEFAULT 'America/New_York',
    "theme" TEXT NOT NULL DEFAULT 'dark',
    "accentColor" TEXT NOT NULL DEFAULT 'blue',
    "dataMode" TEXT NOT NULL DEFAULT 'manual',
    CONSTRAINT "Settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DailyPrep" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "marketRegime" TEXT NOT NULL DEFAULT 'trending',
    "macroEnv" TEXT NOT NULL DEFAULT 'mixed',
    "biasScore" INTEGER NOT NULL DEFAULT 0,
    "activePreset" TEXT NOT NULL DEFAULT 'default',
    "tradeStatus" TEXT NOT NULL DEFAULT 'no-trade',
    "contextNotes" TEXT,
    "summaryNotes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DailyPrep_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "KeyLevels" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dailyPrepId" TEXT NOT NULL,
    "pdh" REAL,
    "pdl" REAL,
    "pc" REAL,
    "spikeHigh" REAL,
    "spikeBase" REAL,
    "globexHigh" REAL,
    "globexLow" REAL,
    "tokyoHigh" REAL,
    "tokyoLow" REAL,
    "londonHigh" REAL,
    "londonLow" REAL,
    "vwap" REAL,
    CONSTRAINT "KeyLevels_dailyPrepId_fkey" FOREIGN KEY ("dailyPrepId") REFERENCES "DailyPrep" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MarketContext" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dailyPrepId" TEXT NOT NULL,
    "market" TEXT NOT NULL,
    "direction" TEXT NOT NULL DEFAULT 'flat',
    "contribution" TEXT NOT NULL DEFAULT 'neutral',
    "notes" TEXT,
    CONSTRAINT "MarketContext_dailyPrepId_fkey" FOREIGN KEY ("dailyPrepId") REFERENCES "DailyPrep" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SessionSummary" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dailyPrepId" TEXT NOT NULL,
    "session" TEXT NOT NULL,
    "classification" TEXT NOT NULL DEFAULT 'range',
    "high" REAL,
    "low" REAL,
    "notes" TEXT,
    CONSTRAINT "SessionSummary_dailyPrepId_fkey" FOREIGN KEY ("dailyPrepId") REFERENCES "DailyPrep" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CatalystEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dailyPrepId" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'economic',
    "description" TEXT NOT NULL,
    "impact" TEXT NOT NULL DEFAULT 'medium',
    "time" TEXT,
    CONSTRAINT "CatalystEvent_dailyPrepId_fkey" FOREIGN KEY ("dailyPrepId") REFERENCES "DailyPrep" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SupplyDemandZone" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dailyPrepId" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'demand',
    "priceHigh" REAL NOT NULL,
    "priceLow" REAL NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 1,
    "notes" TEXT,
    CONSTRAINT "SupplyDemandZone_dailyPrepId_fkey" FOREIGN KEY ("dailyPrepId") REFERENCES "DailyPrep" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TradeChecklist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dailyPrepId" TEXT NOT NULL,
    "regimeIdentified" BOOLEAN NOT NULL DEFAULT false,
    "sessionAligned" BOOLEAN NOT NULL DEFAULT false,
    "crossMarketAligned" BOOLEAN NOT NULL DEFAULT false,
    "catalystReviewed" BOOLEAN NOT NULL DEFAULT false,
    "atKeyLevel" BOOLEAN NOT NULL DEFAULT false,
    "confirmationPresent" BOOLEAN NOT NULL DEFAULT false,
    "riskDefined" BOOLEAN NOT NULL DEFAULT false,
    "entryPlanDefined" BOOLEAN NOT NULL DEFAULT false,
    "exitPlanDefined" BOOLEAN NOT NULL DEFAULT false,
    "setupGrade" TEXT,
    CONSTRAINT "TradeChecklist_dailyPrepId_fkey" FOREIGN KEY ("dailyPrepId") REFERENCES "DailyPrep" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TradePlan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "dailyBias" TEXT,
    "longScenarios" TEXT,
    "shortScenarios" TEXT,
    "longEntry" TEXT,
    "longStop" TEXT,
    "longTarget1" TEXT,
    "longTarget2" TEXT,
    "shortEntry" TEXT,
    "shortStop" TEXT,
    "shortTarget1" TEXT,
    "shortTarget2" TEXT,
    "invalidation" TEXT,
    "setupQuality" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TradePlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "JournalEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "setup" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "entry" REAL NOT NULL,
    "exit" REAL,
    "stop" REAL NOT NULL,
    "target" REAL NOT NULL,
    "pnl" REAL,
    "notes" TEXT,
    "screenshot" TEXT,
    "lesson" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "JournalEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReviewEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "followedPlan" BOOLEAN NOT NULL DEFAULT false,
    "bestTrade" TEXT,
    "worstMistake" TEXT NOT NULL,
    "oneImprovement" TEXT NOT NULL,
    "emotionalState" TEXT NOT NULL DEFAULT 'focused',
    "executionScore" INTEGER NOT NULL DEFAULT 5,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ReviewEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Preset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "markets" TEXT NOT NULL,
    "panelOrder" TEXT NOT NULL,
    "focusNote" TEXT,
    "cautionNote" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Preset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Settings_userId_key" ON "Settings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DailyPrep_userId_date_key" ON "DailyPrep"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "KeyLevels_dailyPrepId_key" ON "KeyLevels"("dailyPrepId");

-- CreateIndex
CREATE UNIQUE INDEX "TradeChecklist_dailyPrepId_key" ON "TradeChecklist"("dailyPrepId");

-- CreateIndex
CREATE UNIQUE INDEX "TradePlan_userId_date_key" ON "TradePlan"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "ReviewEntry_userId_date_key" ON "ReviewEntry"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Preset_userId_name_key" ON "Preset"("userId", "name");
