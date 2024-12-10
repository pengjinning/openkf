package io.typebot.features.block.handler;

import io.typebot.features.block.model.Block;
import io.typebot.features.block.model.BlockType;
import io.typebot.features.block.model.options.TextBlockOptions;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class TextBlockHandler implements BlockHandler {
    private final ObjectMapper objectMapper;
    private final Pattern variablePattern = Pattern.compile("\\{\\{([^}]+)}}");
    
    public TextBlockHandler(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public String getType() {
        return BlockType.TEXT.name();
    }

    @Override
    public Map<String, Object> processBlock(Block block, Map<String, Object> context) {
        TextBlockOptions options = objectMapper.convertValue(block.getOptions(), TextBlockOptions.class);
        String processedContent = processContent(options.getContent(), context);
        context.put("output", processedContent);
        return context;
    }

    @Override
    public boolean validateOptions(Block block) {
        try {
            TextBlockOptions options = objectMapper.convertValue(block.getOptions(), TextBlockOptions.class);
            return options.getContent() != null && !options.getContent().trim().isEmpty();
        } catch (Exception e) {
            return false;
        }
    }

    private String processContent(String content, Map<String, Object> context) {
        if (content == null) return "";
        
        StringBuffer result = new StringBuffer();
        Matcher matcher = variablePattern.matcher(content);
        
        while (matcher.find()) {
            String variable = matcher.group(1).trim();
            Object value = context.getOrDefault(variable, "");
            matcher.appendReplacement(result, value.toString());
        }
        matcher.appendTail(result);
        
        return result.toString();
    }
} 
