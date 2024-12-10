package io.typebot.features.template.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "templates")
public class Template {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    private String name;
    private String description;
    private String category;
    
    @Column(columnDefinition = "jsonb")
    private String settings;
    
    private boolean isPublic;
} 
