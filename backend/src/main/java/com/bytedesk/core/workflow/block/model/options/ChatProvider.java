package com.bytedesk.core.workflow.block.model.options;

public enum ChatProvider {
    OPENAI,
    ANTHROPIC,
    AZURE_OPENAI,
    HUGGING_FACE;
    
    public static ChatProvider fromString(String provider) {
        try {
            return valueOf(provider.toUpperCase());
        } catch (Exception e) {
            return OPENAI;
        }
    }
} 
