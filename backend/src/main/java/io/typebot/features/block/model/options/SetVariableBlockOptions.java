package io.typebot.features.block.model.options;

import io.typebot.features.block.model.BlockOptions;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class SetVariableBlockOptions extends BlockOptions {
    private String variableId;
    private String expressionToEvaluate;
    private ExpressionType type;  // STATIC, JAVASCRIPT, TEMPLATE
    private boolean isCode;
}