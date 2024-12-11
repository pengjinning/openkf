package com.bytedesk.core.workflow.block.handler;

import java.util.Map;

import com.bytedesk.core.workflow.block.model.Block;

public interface BlockHandler {
    String getType();
    Map<String, Object> processBlock(Block block, Map<String, Object> context);
    boolean validateOptions(Block block);
} 
