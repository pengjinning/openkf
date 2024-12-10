package io.typebot.features.bot.model;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PublicId {
    private String id;
    private LocalDateTime createdAt;
} 
