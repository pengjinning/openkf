/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-09 21:24:05
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-10 07:36:06
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  技术/商务联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
import { resolve } from "path";
import { defineConfig, devices } from "@playwright/test";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: resolve(__dirname, "../../.env") });

export default defineConfig({
  timeout: process.env.CI ? 50 * 1000 : 40 * 1000,
  expect: {
    timeout: process.env.CI ? 10 * 1000 : 5 * 1000,
  },
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 1 : 4,
  retries: process.env.CI ? 2 : 1,
  reporter: [
    [process.env.CI ? "github" : "list"],
    ["html", { outputFolder: "src/test/reporters" }],
  ],
  maxFailures: 10,
  webServer: process.env.CI
    ? {
        command: "bun run start",
        timeout: 60_000,
        reuseExistingServer: true,
        port: 9011,
      }
    : undefined,
  outputDir: "./src/test/results",
  use: {
    trace: "on-first-retry",
    locale: "en-US",
    baseURL: process.env.NEXT_PUBLIC_VIEWER_URL?.split(",")[0],
  },
  projects: [
    {
      name: "setup db",
      testMatch: /global\.setup\.ts/,
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["setup db"],
    },
  ],
});
