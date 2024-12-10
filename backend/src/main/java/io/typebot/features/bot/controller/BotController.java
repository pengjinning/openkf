/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-10 12:15:41
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-10 20:55:24
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  技术/商务联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
package io.typebot.features.bot.controller;

import io.typebot.features.bot.model.Bot;
import io.typebot.features.bot.service.BotService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bots")
@RequiredArgsConstructor
public class BotController {
    private final BotService botService;

    @PostMapping
    public Bot createBot(@RequestBody Bot bot) {
        return botService.createBot(bot);
    }

    @GetMapping("/{id}")
    public Bot getBot(@PathVariable String id) {
        return botService.getBot(id);
    }

    @PutMapping("/{id}")
    public Bot updateBot(@PathVariable String id, @RequestBody Bot bot) {
        return botService.updateBot(id, bot);
    }

    @DeleteMapping("/{id}")
    public void deleteBot(@PathVariable String id) {
        botService.deleteBot(id);
    }

    @GetMapping("/workspace/{workspaceId}")
    public List<Bot> getWorkspaceBots(@PathVariable String workspaceId) {
        return botService.getWorkspaceBots(workspaceId);
    }

    @PostMapping("/{id}/publish")
    public Bot publishBot(@PathVariable String id, @RequestBody Map<String, String> body) {
        String publishedTypebotId = body.get("publishedTypebotId");
        return botService.publishBot(id, publishedTypebotId);
    }
}