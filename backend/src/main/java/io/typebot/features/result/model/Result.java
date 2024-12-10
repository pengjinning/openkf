package io.typebot.features.result.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.Map;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Data
@Entity
@Table(name = "results")
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @Column(name = "bot_id")
    private String botId;
    
    @Column(columnDefinition = "jsonb")
    private String answersJson;
    
    @Column(columnDefinition = "jsonb")
    private String variablesJson;
    
    private String status;  // COMPLETED, IN_PROGRESS, etc.
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    @Transient
    private Map<String, Object> answers;
    
    @Transient
    private Map<String, Object> variables;
    
    @PostLoad
    private void loadJsonFields() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            if (answersJson != null) {
                this.answers = mapper.readValue(answersJson, new TypeReference<Map<String, Object>>() {});
            }
            if (variablesJson != null) {
                this.variables = mapper.readValue(variablesJson, new TypeReference<Map<String, Object>>() {});
            }
        } catch (Exception e) {
            throw new RuntimeException("Error loading JSON fields", e);
        }
    }
    
    @PrePersist
    @PreUpdate
    private void saveJsonFields() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            if (answers != null) {
                this.answersJson = mapper.writeValueAsString(answers);
            }
            if (variables != null) {
                this.variablesJson = mapper.writeValueAsString(variables);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error saving JSON fields", e);
        }
    }
} 
