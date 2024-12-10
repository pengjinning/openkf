package io.typebot.features.block.model.options;

import io.typebot.features.block.model.BlockOptions;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.List;
import java.util.Map;

@Data
@EqualsAndHashCode(callSuper = true)
public class IntegrationBlockOptions extends BlockOptions {
    private String integrationType;  // GOOGLE_SHEETS, GOOGLE_ANALYTICS, ZAPIER, etc.
    private String action;  // CREATE, UPDATE, DELETE, etc.
    private Map<String, String> credentials;
    private Map<String, Object> params;
    private List<FieldMapping> fieldMappings;
    private String variableName;  // 存储集成结果的变量
}
