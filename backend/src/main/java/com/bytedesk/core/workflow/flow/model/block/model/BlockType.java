package com.bytedesk.core.workflow.flow.model.block.model;

import com.fasterxml.jackson.annotation.JsonValue;

public enum BlockType {
    TEXT("text"),
    TEXT_INPUT("text input"),
    CHOICE_INPUT("choice input"),
    CONDITION("Condition"),
    WEBHOOK("webhook"),
    SCRIPT("script"),
    INTEGRATION("integration"),
    EMAIL("email"),
    CHAT("chat"),
    WAIT("wait"),
    REDIRECT("redirect"),
    FILE("file"),
    VIDEO("video"),
    AUDIO("audio"),
    IMAGE("image"),
    AB_TEST("ab_test"),
    PAYMENT("payment"),
    SET_VARIABLE("Set variable"),
    TYPEBOT_LINK("typebot_link"),
    JUMP("Jump"),
    OPENAI("openai");

    private final String value;

    BlockType(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    public static BlockType fromValue(String value) {
        for (BlockType type : BlockType.values()) {
            if (type.value.equals(value)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Unknown BlockType value: " + value);
    }
} 
