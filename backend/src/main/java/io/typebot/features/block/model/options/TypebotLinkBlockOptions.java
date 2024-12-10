package io.typebot.features.block.model.options;

import io.typebot.features.block.model.BlockOptions;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.Map;

@Data
@EqualsAndHashCode(callSuper = true)
public class TypebotLinkBlockOptions extends BlockOptions {
    private String typebotId;  // 链接的Typebot ID
    private String groupId;    // 链接的起始Group ID
    private Map<String, String> variableMapping;  // 变量映射
    private boolean mergeResults;  // 是否合并结果
    private String variableName;   // 存储执行结果的变量名
} 
