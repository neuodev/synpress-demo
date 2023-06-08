import { Page } from "@playwright/test";
import { test, expect } from "../pw-fixtures";
import * as metamask from "@synthetixio/synpress/commands/metamask";

let sharedPage: Page;

test.describe.configure({ mode: "serial" });

test.beforeAll(async ({ page }) => {
  sharedPage = page;
  page.goto("http://localhost:8080");
});

test.afterAll(async ({ context }) => {
  await context.close();
});

test("should connect to MetaMask and display wallet address", async () => {
  await expect(sharedPage.locator("#address")).toHaveText("Address: ??");
  await expect(sharedPage.locator("#connected")).toHaveText("Connected: NO");

  await sharedPage.locator("#connect-btn").click();
  await metamask.acceptAccess();

  await expect(sharedPage.locator("#address")).toHaveText(
    "Address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
  );
  await expect(sharedPage.locator("#connected")).toHaveText("Connected: YES");

  sharedPage.locator("#disconnect-btn").click();
  await expect(sharedPage.locator("#address")).toHaveText("Address: ??");
  await expect(sharedPage.locator("#connected")).toHaveText("Connected: NO");
});
