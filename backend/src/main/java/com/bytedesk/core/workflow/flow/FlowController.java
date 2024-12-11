/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-10 12:15:41
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-11 09:46:27
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

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/flow")
@RequiredArgsConstructor
public class FlowController {
    private final FlowService botService;

    @PostMapping
    public Flow createFlow(@RequestBody Flow bot) {
        return botService.createFlow(bot);
    }

    @GetMapping("/{id}")
    public Flow getFlow(@PathVariable String id) {
        return botService.getFlow(id);
    }

    @PutMapping("/{id}")
    public Flow updateFlow(@PathVariable String id, @RequestBody Flow bot) {
        return botService.updateFlow(id, bot);
    }

    @DeleteMapping("/{id}")
    public void deleteFlow(@PathVariable String id) {
        botService.deleteFlow(id);
    }

    // @GetMapping("/workspace/{workspaceId}")
    // public List<Flow> getWorkspaceFlows(@PathVariable String workspaceId) {
    //     return botService.getWorkspaceFlows(workspaceId);
    // }

    @PostMapping("/{id}/publish")
    public Flow publishFlow(@PathVariable String id, @RequestBody Map<String, String> body) {
        String publishedTypebotId = body.get("publishedTypebotId");
        return botService.publishFlow(id, publishedTypebotId);
    }
}
