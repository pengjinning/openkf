/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-10 11:16:50
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-11 14:57:10
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM –
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license.
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE
 *  contact: 270580156@qq.com
 *  技术/商务联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved.
 */
import { FC, useEffect, useState } from "react";
import { Stack, Text, Button, SimpleGrid, Card } from "@/components/ui";
import { useNavigate } from "react-router-dom";
import { getFlowsByOrg } from "@/api/flow";

interface Flow {
  id: string;
  name: string;
  icon?: string;
  description?: string;
}

export const OnboardingPage: FC = () => {
  const navigate = useNavigate();
  const [flows, setFlows] = useState<Flow[]>([]);

  useEffect(() => {
    const fetchFlows = async () => {
      try {
        const response = await getFlowsByOrg();
        if (response.success) {
          setFlows(response.data.content);
        }
      } catch (error) {
        console.error("Failed to fetch flows:", error);
      }
    };
    fetchFlows();
  }, []);

  return (
    <Stack p={8} spacing={6}>
      <Text fontSize="2xl" fontWeight="bold">
        欢迎使用 Bytedesk
      </Text>
      <Button onClick={() => navigate("/onboarding")}>开始使用</Button>

      <Text fontSize="xl" fontWeight="semibold" mt={8}>
        我的工作流
      </Text>

      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {flows.map((flow) => (
          <Card
            key={flow.id}
            p={4}
            cursor="pointer"
            onClick={() => navigate(`/flow/${flow.id}`)}
          >
            <Stack>
              <Text fontSize="lg">
                {flow.icon} {flow.name}
              </Text>
              {flow.description && (
                <Text color="gray.600" fontSize="sm">
                  {flow.description}
                </Text>
              )}
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </Stack>
  );
};
