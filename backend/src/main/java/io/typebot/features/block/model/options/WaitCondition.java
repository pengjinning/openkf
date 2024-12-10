package io.typebot.features.block.model.options;

import lombok.Data;

@Data
public class WaitCondition {
    private String variable;
    private String operator;  // equals, notEquals, contains, etc.
    private String value;
    private Integer timeout;  // 超时时间(秒)
} 
