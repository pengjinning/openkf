package io.typebot.features.analytics.repository;

import io.typebot.features.analytics.model.Analytics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Repository
public interface AnalyticsRepository extends JpaRepository<Analytics, String> {
    List<Analytics> findByBotId(String botId);
    
    @Query(value = """
        SELECT type as _id, COUNT(*) as count 
        FROM analytics 
        WHERE bot_id = ?1 
        GROUP BY type
        """, nativeQuery = true)
    List<Map<String, Object>> countByType(String botId);
    
    @Query(value = """
        SELECT DATE(timestamp) as _id, COUNT(*) as count 
        FROM analytics 
        WHERE bot_id = ?1 AND timestamp BETWEEN ?2 AND ?3 
        GROUP BY DATE(timestamp) 
        ORDER BY DATE(timestamp)
        """, nativeQuery = true)
    List<Map<String, Object>> countByDateRange(String botId, LocalDateTime start, LocalDateTime end);
} 
