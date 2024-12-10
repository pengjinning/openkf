package io.typebot.features.workspace.service;

import io.typebot.features.workspace.model.WorkspaceMember;
import io.typebot.features.workspace.repository.WorkspaceMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkspaceMemberService {
    private final WorkspaceMemberRepository memberRepository;
    
    public WorkspaceMember addMember(WorkspaceMember member) {
        if (memberRepository.existsByWorkspaceIdAndUserId(member.getWorkspaceId(), member.getUserId())) {
            throw new RuntimeException("User is already a member of this workspace");
        }
        
        member.setCreatedAt(LocalDateTime.now());
        member.setUpdatedAt(LocalDateTime.now());
        return memberRepository.save(member);
    }
    
    public WorkspaceMember updateMemberRole(String workspaceId, String userId, String newRole) {
        WorkspaceMember member = memberRepository.findByWorkspaceIdAndUserId(workspaceId, userId)
            .orElseThrow(() -> new RuntimeException("Member not found"));
            
        member.setRole(newRole);
        member.setUpdatedAt(LocalDateTime.now());
        return memberRepository.save(member);
    }
    
    public void removeMember(String workspaceId, String userId) {
        WorkspaceMember member = memberRepository.findByWorkspaceIdAndUserId(workspaceId, userId)
            .orElseThrow(() -> new RuntimeException("Member not found"));
        memberRepository.delete(member);
    }
    
    public List<WorkspaceMember> getWorkspaceMembers(String workspaceId) {
        return memberRepository.findByWorkspaceId(workspaceId);
    }
    
    public List<WorkspaceMember> getUserWorkspaces(String userId) {
        return memberRepository.findByUserId(userId);
    }
} 
