package com.bytedesk.core.workflow.analytics;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalyticsService {
    private final AnalyticsRepository analyticsRepository;

    public Analytics trackEvent(Analytics analytics) {
        analytics.setTimestamp(LocalDateTime.now());
        return analyticsRepository.save(analytics);
    }
    
    public List<Analytics> getBotAnalytics(String botId) {
        return analyticsRepository.findByBotId(botId);
    }
    
    public Map<String, Long> getBotEventCounts(String botId) {
        return analyticsRepository.countByType(botId).stream()
            .collect(Collectors.toMap(
                m -> (String) m.get("_id"),
                m -> ((Number) m.get("count")).longValue()
            ));
    }
    
    public List<Map<String, Object>> getBotDailyStats(
        String botId,
        LocalDateTime startTime,
        LocalDateTime endTime
    ) {
        return analyticsRepository.countByDateRange(botId, startTime, endTime);
    }
    
    public void deleteAnalytics(String botId) {
        List<Analytics> analytics = analyticsRepository.findByBotId(botId);
        analyticsRepository.deleteAll(analytics);
    }
} 
