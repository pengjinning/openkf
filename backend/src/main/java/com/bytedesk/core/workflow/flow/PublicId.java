package com.bytedesk.core.workflow.flow;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PublicId {
    private String id;
    private LocalDateTime createdAt;
} 
