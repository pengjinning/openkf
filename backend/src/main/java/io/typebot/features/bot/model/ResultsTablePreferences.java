package io.typebot.features.bot.model;

import lombok.Data;
import java.util.List;

@Data
public class ResultsTablePreferences {
    private List<String> columnsOrder;
    private List<String> hiddenColumns;
} 
