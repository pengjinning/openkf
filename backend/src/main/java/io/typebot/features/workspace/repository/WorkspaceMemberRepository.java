package io.typebot.features.workspace.repository;

import io.typebot.features.workspace.model.WorkspaceMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface WorkspaceMemberRepository extends JpaRepository<WorkspaceMember, String> {
    List<WorkspaceMember> findByWorkspaceId(String workspaceId);
    List<WorkspaceMember> findByUserId(String userId);
    Optional<WorkspaceMember> findByWorkspaceIdAndUserId(String workspaceId, String userId);
    boolean existsByWorkspaceIdAndUserId(String workspaceId, String userId);
} 
