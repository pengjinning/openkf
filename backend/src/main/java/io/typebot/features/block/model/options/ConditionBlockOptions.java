package io.typebot.features.block.model.options;

import java.util.List;

import io.typebot.features.block.model.BlockOptions;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ConditionBlockOptions extends BlockOptions {
    private List<ConditionItem> items;
    private String comparisons;
}