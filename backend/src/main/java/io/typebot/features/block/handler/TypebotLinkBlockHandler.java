package io.typebot.features.block.handler;

import io.typebot.features.block.model.Block;
import io.typebot.features.block.model.BlockType;
import io.typebot.features.block.model.options.TypebotLinkBlockOptions;
import io.typebot.features.bot.service.BotService;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
public class TypebotLinkBlockHandler implements BlockHandler {
    private final ObjectMapper objectMapper;
    private final BotService botService;
    
    public TypebotLinkBlockHandler(ObjectMapper objectMapper, BotService botService) {
        this.objectMapper = objectMapper;
        this.botService = botService;
    }

    @Override
    public String getType() {
        return BlockType.TYPEBOT_LINK.name();
    }

    @Override
    public Map<String, Object> processBlock(Block block, Map<String, Object> context) {
        TypebotLinkBlockOptions options = objectMapper.convertValue(block.getOptions(), TypebotLinkBlockOptions.class);
        Map<String, Object> result = new HashMap<>(context);
        
        try {
            // 验证链接的Typebot是否存在
            botService.validateBotAccess(options.getTypebotId(), context);
            
            // 处理变量映射
            Map<String, Object> mappedVariables = new HashMap<>();
            if (options.getVariableMapping() != null) {
                options.getVariableMapping().forEach((targetVar, sourceVar) -> {
                    Object value = context.get(sourceVar);
                    if (value != null) {
                        mappedVariables.put(targetVar, value);
                    }
                });
            }
            
            result.put("linkedTypebotId", options.getTypebotId());
            result.put("startGroupId", options.getGroupId());
            result.put("mappedVariables", mappedVariables);
            result.put("mergeResults", options.isMergeResults());
            
            if (options.getVariableName() != null) {
                result.put(options.getVariableName(), true);
            }
            
            result.put("success", true);
            result.put("blockType", "typebotLink");
            
        } catch (Exception e) {
            log.error("Typebot link processing failed", e);
            result.put("error", e.getMessage());
            result.put("success", false);
        }
        
        return result;
    }

    @Override
    public boolean validateOptions(Block block) {
        try {
            TypebotLinkBlockOptions options = objectMapper.convertValue(block.getOptions(), TypebotLinkBlockOptions.class);
            return options.getTypebotId() != null && !options.getTypebotId().trim().isEmpty();
        } catch (Exception e) {
            return false;
        }
    }
} 
