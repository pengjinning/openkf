package io.typebot.features.analytics.controller;

import io.typebot.features.analytics.model.Analytics;
import io.typebot.features.analytics.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {
    private final AnalyticsService analyticsService;

    @PostMapping("/track")
    public ResponseEntity<Analytics> trackEvent(@RequestBody Analytics analytics) {
        return ResponseEntity.ok(analyticsService.trackEvent(analytics));
    }
    
    @GetMapping("/bot/{botId}")
    public ResponseEntity<List<Analytics>> getBotAnalytics(@PathVariable String botId) {
        return ResponseEntity.ok(analyticsService.getBotAnalytics(botId));
    }
    
    @GetMapping("/bot/{botId}/counts")
    public ResponseEntity<Map<String, Long>> getBotEventCounts(@PathVariable String botId) {
        return ResponseEntity.ok(analyticsService.getBotEventCounts(botId));
    }
    
    @GetMapping("/bot/{botId}/daily")
    public ResponseEntity<List<Map<String, Object>>> getBotDailyStats(
        @PathVariable String botId,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime
    ) {
        return ResponseEntity.ok(analyticsService.getBotDailyStats(botId, startTime, endTime));
    }
    
    @DeleteMapping("/bot/{botId}")
    public ResponseEntity<Void> deleteAnalytics(@PathVariable String botId) {
        analyticsService.deleteAnalytics(botId);
        return ResponseEntity.ok().build();
    }
} 
