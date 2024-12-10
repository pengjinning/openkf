package io.typebot.features.block.model.options;

import io.typebot.features.block.model.BlockOptions;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.Map;

@Data
@EqualsAndHashCode(callSuper = true)
public class ScriptBlockOptions extends BlockOptions {
    private String code;
    private String runtime;  // NODE, PYTHON, etc.
    private String variableName;  // 存储执行结果的变量
    private String errorMessage;
    private boolean async;
    private Map<String, Object> env;
    private RuntimeConfig runtimeConfig;
}
