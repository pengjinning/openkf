package io.typebot.features.block.model.options;

import io.typebot.features.block.model.BlockOptions;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.Map;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class WebhookBlockOptions extends BlockOptions {
    private String url;
    private String method;  // GET, POST, PUT, DELETE
    private Map<String, String> headers;
    private String body;
    private List<String> queryParams;
    private String variableId;  // 存储响应的变量
    private Integer timeout;
    private RetryConfig retryConfig;
}

