package io.typebot.features.block.repository;

import io.typebot.features.block.model.Block;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BlockRepository extends JpaRepository<Block, String> {
    List<Block> findByBotId(String botId);
    List<Block> findByGroupId(String groupId);
    List<Block> findByGroupIdOrderByOrderAsc(String groupId);
    List<Block> findByBotIdAndType(String botId, String type);
    void deleteByGroupId(String groupId);
} 
