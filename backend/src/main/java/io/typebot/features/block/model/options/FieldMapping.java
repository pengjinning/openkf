package io.typebot.features.block.model.options;

import lombok.Data;

@Data
public class FieldMapping {
    private String from;
    private String to;
    private String type;  // VARIABLE, STATIC, EXPRESSION
    private String value;
} 
