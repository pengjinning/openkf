/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-10 11:35:14
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-10 18:04:30
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  技术/商务联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
package io.typebot.features.bot.service;

import io.typebot.features.bot.model.Bot;
import io.typebot.features.bot.repository.BotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BotService {
    private final BotRepository botRepository;

    public Bot createBot(Bot bot) {
        bot.setCreatedAt(LocalDateTime.now());
        bot.setUpdatedAt(LocalDateTime.now());
        return botRepository.save(bot);
    }

    public Bot updateBot(String id, Bot bot) {
        Bot existingBot = botRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bot not found"));

        existingBot.setName(bot.getName());
        existingBot.setDescription(bot.getDescription());
        // existingBot.setGroups(bot.getGroups());
        // existingBot.setEdges(bot.getEdges());
        // existingBot.setVariables(bot.getVariables());
        existingBot.setSettings(bot.getSettings());
        existingBot.setUpdatedAt(LocalDateTime.now());

        return botRepository.save(existingBot);
    }

    public void deleteBot(String id) {
        botRepository.deleteById(id);
    }

    public List<Bot> getWorkspaceBots(String workspaceId) {
        return botRepository.findByWorkspaceId(workspaceId);
    }

    public Bot getBot(String id) {
        return botRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bot not found"));
    }

    public Bot publishBot(String id, String publishedTypebotId) {
        Bot bot = getBot(id);
        bot.setPublishedTypebotId(publishedTypebotId);
        bot.setUpdatedAt(LocalDateTime.now());
        return botRepository.save(bot);
    }

    public void validateBotAccess(String botId, Map<String, Object> context) {
        // TODO: 实现访问权限验证逻辑
    }
}
