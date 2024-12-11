/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-10 11:35:14
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-11 09:46:05
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  技术/商务联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
package com.bytedesk.core.workflow.flow;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class FlowService {
    private final FlowRepository flowRepository;

    public Flow createFlow(Flow flow) {
        flow.setCreatedAt(LocalDateTime.now());
        flow.setUpdatedAt(LocalDateTime.now());
        return flowRepository.save(flow);
    }

    public Flow updateFlow(String id, Flow flow) {
        Flow existingFlow = flowRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flow not found"));

        existingFlow.setName(flow.getName());
        existingFlow.setDescription(flow.getDescription());
        // existingFlow.setGroups(flow.getGroups());
        // existingFlow.setEdges(flow.getEdges());
        // existingFlow.setVariables(flow.getVariables());
        existingFlow.setSettings(flow.getSettings());
        existingFlow.setUpdatedAt(LocalDateTime.now());

        return flowRepository.save(existingFlow);
    }

    public void deleteFlow(String id) {
        flowRepository.deleteById(id);
    }

    // public List<Flow> getWorkspaceFlows(String workspaceId) {
    //     return flowRepository.findByWorkspaceId(workspaceId);
    // }

    public Flow getFlow(String id) {
        return flowRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flow not found"));
    }

    public Flow publishFlow(String id, String publishedTypeflowId) {
        Flow flow = getFlow(id);
        // flow.setPublishedTypeflowId(publishedTypeflowId);
        flow.setUpdatedAt(LocalDateTime.now());
        return flowRepository.save(flow);
    }

    public void validateFlowAccess(String flowId, Map<String, Object> context) {
        // TODO: 实现访问权限验证逻辑
    }
}
