package com.bytedesk.core.workflow.flow;

import com.bytedesk.core.base.BaseResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Builder
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class FlowResponse extends BaseResponse {

  private String name;

    private String description;

    private String icon;

    @Builder.Default
    private String groups = "[]";

    @Builder.Default
    private String events = "[]";

    @Builder.Default
    private String variables = "[]";

    @Builder.Default
    private String edges = "[]";

    @Builder.Default
    private String theme = "{}";

    private String selectedThemeTemplateId;

    @Builder.Default
    private String settings = "{}";

    private String publicId;

    private String customDomain;

    @Builder.Default
    private String resultsTablePreferences = "{}";

    @Builder.Default
    private boolean isArchived = false;

    @Builder.Default
    private boolean isClosed = false;

    private String whatsAppCredentialsId;


}
