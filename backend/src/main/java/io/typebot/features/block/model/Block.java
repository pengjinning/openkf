package io.typebot.features.block.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "blocks")
public class Block {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
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
