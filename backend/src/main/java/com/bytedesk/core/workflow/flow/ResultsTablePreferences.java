package com.bytedesk.core.workflow.flow;

import lombok.Data;
import java.util.List;

@Data
public class ResultsTablePreferences {
    private List<String> columnsOrder;
    private List<String> hiddenColumns;
} 
