/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-10 11:35:08
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-10 17:12:30
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  技术/商务联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
package io.typebot.features.bot.repository;

import io.typebot.features.bot.model.Bot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BotRepository extends JpaRepository<Bot, String> {
    List<Bot> findByWorkspaceId(String workspaceId);

    List<Bot> findByCreatedBy(String userId);

    List<Bot> findByPublishedTypebotId(String publishedTypebotId);
}
