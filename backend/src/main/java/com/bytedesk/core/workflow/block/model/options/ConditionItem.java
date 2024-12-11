package com.bytedesk.core.workflow.block.model.options;

import lombok.Data;



@Data
public class ConditionItem {
    private String id;
    private String variableId;
    private String comparisonOperator;  // equals, contains, greater, less, etc.
    private String value;
} 
