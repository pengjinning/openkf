package io.typebot.features.edge.repository;

import io.typebot.features.edge.model.Edge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EdgeRepository extends JpaRepository<Edge, String> {
    List<Edge> findByBotId(String botId);
    List<Edge> findByFromGroupId(String groupId);
    List<Edge> findByToGroupId(String groupId);
} 
