package io.typebot.features.block.exception;

public class BlockNotFoundException extends RuntimeException {
    public BlockNotFoundException(String id) {
        super("Block not found with id: " + id);
    }
} 
