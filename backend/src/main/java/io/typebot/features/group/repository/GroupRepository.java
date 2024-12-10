package io.typebot.features.group.repository;

import io.typebot.features.group.model.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GroupRepository extends JpaRepository<Group, String> {
    List<Group> findByBotId(String botId);
    List<Group> findByBotIdOrderByOrderAsc(String botId);
} 
