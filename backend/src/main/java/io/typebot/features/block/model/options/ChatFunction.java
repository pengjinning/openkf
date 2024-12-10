package io.typebot.features.block.model.options;

import lombok.Data;
import java.util.List;

@Data
public class ChatFunction {
    private String name;
    private String description;
    private List<FunctionParameter> parameters;
} 
