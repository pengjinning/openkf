/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-10 11:16:50
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-11 15:38:14
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
import {
  Stack,
  Text,
  Button,
  SimpleGrid,
  Card,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Icon,
  HStack,
} from "@/components/ui";
import { useNavigate } from "react-router-dom";
import { getFlowsByOrg } from "@/api/flow";
import { PlusIcon, TemplateIcon, CreateIcon } from "@/components/icons";
import { useFlowStore } from "@/stores/flowStore";
import { Flow } from "@/types/flow";

export const OnboardingPage: FC = () => {
  const navigate = useNavigate();
  const [flows, setFlows] = useState<Flow[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const setCurrentFlow = useFlowStore((state) => state.setCurrentFlow);

  useEffect(() => {
    const fetchFlows = async () => {
      try {
        const response = await getFlowsByOrg();
        console.log("getFlowsByOrg response: ", response);
        if (response?.data?.content) {
          const flowList = response.data.content;
          console.log("Flows to display:", flowList);
          setFlows(flowList);
        } else {
          console.warn("Unexpected response structure:", response);
        }
      } catch (error) {
        console.error("Failed to fetch flows:", error);
      }
    };
    fetchFlows();
  }, []);

  console.log("Current flows state:", flows);

  const handleCreateFromTemplate = () => {
    onClose();
    navigate("/flow/create?from=template");
  };

  const handleCreateNew = () => {
    onClose();
    navigate("/flow/create");
  };

  const handleFlowClick = (flow: Flow) => {
    setCurrentFlow(flow);
    navigate(`/flow/${flow.uid}`);
  };

  return (
    <Stack p={8} spacing={6}>
      <HStack justify="space-between" align="center">
        <Text fontSize="xl" fontWeight="semibold">
          我的工作流
        </Text>
        <Button
          leftIcon={<Icon as={PlusIcon} />}
          colorScheme="blue"
          onClick={onOpen}
        >
          创建工作流
        </Button>
      </HStack>

      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {flows && flows.length > 0 ? (
          flows.map((flow) => (
            <Card
              key={flow.uid}
              p={4}
              cursor="pointer"
              onClick={() => handleFlowClick(flow)}
              _hover={{ shadow: "md" }}
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
          ))
        ) : (
          <Text color="gray.500">暂无工作流</Text>
        )}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>创建工作流</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <Card
                p={4}
                w="full"
                cursor="pointer"
                onClick={handleCreateFromTemplate}
                _hover={{ shadow: "md" }}
              >
                <HStack>
                  <Icon as={TemplateIcon} boxSize={6} />
                  <Stack spacing={1}>
                    <Text fontWeight="semibold">从模板创建</Text>
                    <Text fontSize="sm" color="gray.600">
                      使用预设模板快速开始
                    </Text>
                  </Stack>
                </HStack>
              </Card>

              <Card
                p={4}
                w="full"
                cursor="pointer"
                onClick={handleCreateNew}
                _hover={{ shadow: "md" }}
              >
                <HStack>
                  <Icon as={CreateIcon} boxSize={6} />
                  <Stack spacing={1}>
                    <Text fontWeight="semibold">全新创建</Text>
                    <Text fontSize="sm" color="gray.600">
                      从空白画布开始创建
                    </Text>
                  </Stack>
                </HStack>
              </Card>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  );
};
