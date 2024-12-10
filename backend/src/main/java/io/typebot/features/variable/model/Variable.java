package io.typebot.features.variable.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "variables")
public class Variable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    private String name;
    private String type;  // TEXT, NUMBER, BOOLEAN, etc.
    private String defaultValue;
    
    @Column(name = "bot_id")
    private String botId;
} 
