/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-14 16:32:52
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-26 17:41:12
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  技术/商务联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
import { request } from '@/utils/request';
import { useEffect, useState } from 'react';

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
    setIsLoading(true);
    try {
      const result = await request.get('/api/flow/query/org', {
        params: {
          pageNumber: 0,
          pageSize: 10
        }
      });
      setData(result.data);
    } catch (error: any) {
      onError(new Error(error.message));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTypebots();
  }, [folderId, workspaceId]);

  return {
    typebots: data?.content,
    isLoading,
    refetch: fetchTypebots,
  };
}; 
