/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-09 21:24:04
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-14 16:36:53
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  技术/商务联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
// import { trpc } from "@/lib/trpc";

import { useEffect, useState } from "react";

export const useTypebots = ({
  folderId,
  workspaceId,
  onError,
}: {
  workspaceId?: string;
  folderId?: string | "root";
  onError: (error: Error) => void;
}) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTypebots = async () => {
    // if (!workspaceId) return;

    setIsLoading(true);
    try {
      // const response = await fetch(`/api/typebots?workspaceId=${workspaceId}&folderId=${folderId}`);
      const response = await fetch(`http://127.0.0.1:9003/flow/query/org?pageNumber=0&pageSize=10`);
      console.log("fetchTypebots response: ", response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (error: any) {
      onError(new Error(error.message));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTypebots();
  }, [folderId, workspaceId, onError]);

  return {
    typebots: data?.typebots,
    isLoading,
    refetch: () => fetchTypebots(), // 重新请求的函数
  };
};

// export const useTypebots = ({
//   folderId,
//   workspaceId,
//   onError,
// }: {
//   workspaceId?: string;
//   folderId?: string | "root";
//   onError: (error: Error) => void;
// }) => {
//   // 
//   const { data, isLoading, refetch } = trpc.typebot.listTypebots.useQuery(
//     {
//       workspaceId: workspaceId as string,
//       folderId,
//     },
//     {
//       enabled: !!workspaceId,
//       onError: (error) => {
//         onError(new Error(error.message));
//       },
//     },
//   );
//   return {
//     typebots: data?.typebots,
//     isLoading,
//     refetch,
//   };
// };
