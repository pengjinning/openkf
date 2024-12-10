package io.typebot.features.block.model.options;

import io.typebot.features.block.model.BlockOptions;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.List;
import java.util.Map;

@Data
@EqualsAndHashCode(callSuper = true)
public class ChatBlockOptions extends BlockOptions {
    private List<Message> messages;
    private String model;
    private Map<String, Object> modelConfig;
    private String systemPrompt;
    private String errorMessage;
} 
