package com.bytedesk.core.workflow.block.model.options;

import com.bytedesk.core.workflow.block.model.BlockOptions;

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
