/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-10 15:34:16
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-10 17:03:17
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM –
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license.
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE
 *  contact: 270580156@qq.com
 *  技术/商务联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved.
 */
import { createBrowserRouter } from "react-router-dom";
import { BaseLayout } from "@/layouts/BaseLayout";
import { OnboardingPage } from "@/features/onboarding/OnboardingPage";
import { DashboardPage } from "@/features/dashboard/DashboardPage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <BaseLayout />,
      children: [
        {
          index: true,
          element: <DashboardPage />,
        },
        {
          path: "onboarding",
          element: <OnboardingPage />,
        },
      ],
    },
  ],
  {
    // Add future flags to resolve warnings
    future: {
      // v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
