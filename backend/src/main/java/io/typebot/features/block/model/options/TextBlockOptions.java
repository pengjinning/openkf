package io.typebot.features.block.model.options;

import io.typebot.features.block.model.BlockOptions;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class TextBlockOptions extends BlockOptions {
    private String content;
    private String richText;
    private boolean isLongText;
} 
