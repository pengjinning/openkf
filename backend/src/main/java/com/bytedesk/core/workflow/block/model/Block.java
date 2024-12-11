package com.bytedesk.core.workflow.block.model;

import com.bytedesk.core.base.BaseEntity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
@Data
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "bytedesk_core_workflow_block")
public class Block extends BaseEntity {
    
    @Column(name = "group_id")
    private String groupId;
    
    @Enumerated(EnumType.STRING)
    private BlockType type;
    
    @Column(columnDefinition = "jsonb")
    private String options;
    
    private Integer order;
    
    @Column(name = "bot_id")
    private String botId;
}
