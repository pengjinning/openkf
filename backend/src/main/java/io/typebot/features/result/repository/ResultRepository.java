package io.typebot.features.result.repository;

import io.typebot.features.result.model.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ResultRepository extends JpaRepository<Result, String> {
    List<Result> findByBotId(String botId);
    List<Result> findByBotIdAndStatus(String botId, String status);
} 
