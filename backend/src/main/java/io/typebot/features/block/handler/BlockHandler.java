package io.typebot.features.block.handler;

import io.typebot.features.block.model.Block;
import java.util.Map;

public interface BlockHandler {
    String getType();
    Map<String, Object> processBlock(Block block, Map<String, Object> context);
    boolean validateOptions(Block block);
} 
