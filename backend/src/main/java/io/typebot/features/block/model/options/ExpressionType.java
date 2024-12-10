package io.typebot.features.block.model.options;


public enum ExpressionType {
    STATIC,
    JAVASCRIPT,
    TEMPLATE;
    
    public static ExpressionType fromString(String type) {
        try {
            return valueOf(type.toUpperCase());
        } catch (Exception e) {
            return STATIC;
        }
    }
} 
