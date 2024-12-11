package com.bytedesk.core.workflow.block;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.bytedesk.core.workflow.block.model.Block;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BlockService {
    private final BlockRepository blockRepository;

    public Block createBlock(Block block) {
        return blockRepository.save(block);
    }

    public Block updateBlock(String id, Block block) {
        Block existingBlock = blockRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Block not found"));
            
        existingBlock.setType(block.getType());
        existingBlock.setOptions(block.getOptions());
        existingBlock.setOrder(block.getOrder());
        
        return blockRepository.save(existingBlock);
    }

    public void deleteBlock(String id) {
        blockRepository.deleteById(id);
    }

    public Block getBlock(String id) {
        return blockRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Block not found"));
    }

    public List<Block> getGroupBlocks(String groupId) {
        return blockRepository.findByGroupIdOrderByOrderAsc(groupId);
    }

    public void reorderBlocks(List<Block> blocks) {
        int order = 0;
        for (Block block : blocks) {
            block.setOrder(order++);
            blockRepository.save(block);
        }
    }
} 
