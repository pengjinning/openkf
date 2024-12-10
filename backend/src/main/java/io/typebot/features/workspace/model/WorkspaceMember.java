package io.typebot.features.workspace.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "workspace_members")
public class WorkspaceMember {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @Column(name = "workspace_id")
    private String workspaceId;
    
    @Column(name = "user_id")
    private String userId;
    
    private String role;  // ADMIN, MEMBER, GUEST
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
} 
