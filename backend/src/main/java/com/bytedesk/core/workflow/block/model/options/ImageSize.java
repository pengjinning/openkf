package com.bytedesk.core.workflow.block.model.options;

import lombok.Data;

@Data
public class ImageSize {
    private Integer width;
    private Integer height;
    private String unit;  // px, %, em, etc.
} 
