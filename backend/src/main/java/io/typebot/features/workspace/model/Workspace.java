package io.typebot.features.workspace.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "workspaces")
public class Workspace {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    private String name;
    
    @Column(name = "plan_id")
    private String planId;  // FREE, PRO, ENTERPRISE
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Column(name = "members_config", columnDefinition = "jsonb")
    private String membersConfig;
    
    @Column(name = "additional_storage_bytes")
    private Long additionalStorageBytes;
    
    @Column(name = "additional_chats")
    private Integer additionalChats;
    
    @Column(name = "customer_id")
    private String customerId;  // 支付系统的客户ID
    
    @Column(name = "subscription_id")
    private String subscriptionId;  // 订阅ID
    
    @Column(name = "default_domain")
    private String defaultDomain;
} 
