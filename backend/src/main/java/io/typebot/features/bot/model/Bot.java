package io.typebot.features.bot.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import com.fasterxml.jackson.databind.ObjectMapper;

@Data
@Entity
@Table(name = "bots")
public class Bot {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    private String name;
    private String description;
    private String workspaceId;
    private String createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String publishedTypebotId;
    private String customDomain;
    
    @Column(columnDefinition = "jsonb")
    private String settingsJson;
    
    @Column(columnDefinition = "jsonb")
    private String publicIdJson;
    
    @Column(columnDefinition = "jsonb")
    private String resultsTablePreferencesJson;

    @Transient
    private Settings settings;
    
    @Transient
    private PublicId publicId;
    
    @Transient
    private ResultsTablePreferences resultsTablePreferences;

    @PostLoad
    private void loadJsonFields() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            if (settingsJson != null) {
                this.settings = mapper.readValue(settingsJson, Settings.class);
            }
            if (publicIdJson != null) {
                this.publicId = mapper.readValue(publicIdJson, PublicId.class);
            }
            if (resultsTablePreferencesJson != null) {
                this.resultsTablePreferences = mapper.readValue(resultsTablePreferencesJson, ResultsTablePreferences.class);
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
            if (settings != null) {
                this.settingsJson = mapper.writeValueAsString(settings);
            }
            if (publicId != null) {
                this.publicIdJson = mapper.writeValueAsString(publicId);
            }
            if (resultsTablePreferences != null) {
                this.resultsTablePreferencesJson = mapper.writeValueAsString(resultsTablePreferences);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error saving JSON fields", e);
        }
    }
} 
