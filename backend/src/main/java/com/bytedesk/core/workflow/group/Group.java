/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-10 11:36:17
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-11 09:55:15
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  技术/商务联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
package com.bytedesk.core.workflow.group;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

import com.bytedesk.core.base.BaseEntity;
import com.bytedesk.core.workflow.block.model.Block;

@Data
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "bytedesk_core_workflow_group")
public class Group extends BaseEntity {

    private String title;
    private Integer order;
    private String graphCoordinates;

    @Column(name = "bot_id")
    private String botId;

    @OneToMany(mappedBy = "groupId", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Block> blocks;
}
