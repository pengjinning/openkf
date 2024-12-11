package com.bytedesk.core.workflow.block.model;

import lombok.Data;
@Data
public class Block {

    private String uid;
    
    private String groupId;
    
    private BlockType type;
    
    private String options;
    
    private Integer order;
    
    private String botId;
}
