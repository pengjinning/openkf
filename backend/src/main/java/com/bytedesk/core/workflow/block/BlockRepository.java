package com.bytedesk.core.workflow.block;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bytedesk.core.workflow.block.model.Block;

import java.util.List;

@Repository
public interface BlockRepository extends JpaRepository<Block, String> {
    List<Block> findByBotId(String botId);
    List<Block> findByGroupId(String groupId);
    List<Block> findByGroupIdOrderByOrderAsc(String groupId);
    List<Block> findByBotIdAndType(String botId, String type);
    void deleteByGroupId(String groupId);
} 
