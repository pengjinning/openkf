package io.typebot.features.block.model.options;

import lombok.Data;



@Data
public class ConditionItem {
    private String id;
    private String variableId;
    private String comparisonOperator;  // equals, contains, greater, less, etc.
    private String value;
} 
