package io.typebot.features.block.model.options;

import io.typebot.features.block.model.BlockOptions;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class ChoiceBlockOptions extends BlockOptions {
    private List<ChoiceItem> items;
    private boolean isMultipleChoice;
    private String buttonLabel;
    private boolean dynamicItems;
    private String dynamicVariableId;
    private String searchInputPlaceholder;
} 
