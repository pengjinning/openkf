package com.bytedesk.core.workflow.analytics;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

import com.bytedesk.core.base.BaseEntity;

@Data
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "bytedesk_core_workflow_analytic")
public class Analytics extends BaseEntity {

    
    private String botId;
    private String type;
    private LocalDateTime timestamp;
    private String metadata;
} 
