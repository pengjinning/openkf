/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-10 17:01:55
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-11 09:59:57
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  技术/商务联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
package com.bytedesk.core.workflow.flow;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

import com.bytedesk.core.base.BaseEntity;
import com.fasterxml.jackson.databind.ObjectMapper;

@Data
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "bytedesk_core_workflow_flow")
public class Flow extends BaseEntity {

    private String name;
    private String description;
    private String workspaceId;
    private String createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String publishedTypebotId;
    private String customDomain;

    @Column(columnDefinition = "jsonb")
    private String settingsJson;

    @Column(columnDefinition = "jsonb")
    private String publicIdJson;

    @Column(columnDefinition = "jsonb")
    private String resultsTablePreferencesJson;

    @Transient
    private Settings settings;

    @Transient
    private PublicId publicId;

    @Transient
    private ResultsTablePreferences resultsTablePreferences;

    @PostLoad
    private void loadJsonFields() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            if (settingsJson != null) {
                this.settings = mapper.readValue(settingsJson, Settings.class);
            }
            if (publicIdJson != null) {
                this.publicId = mapper.readValue(publicIdJson, PublicId.class);
            }
            if (resultsTablePreferencesJson != null) {
                this.resultsTablePreferences = mapper.readValue(resultsTablePreferencesJson,
                        ResultsTablePreferences.class);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error loading JSON fields", e);
        }
    }

    @PrePersist
    @PreUpdate
    private void saveJsonFields() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            if (settings != null) {
                this.settingsJson = mapper.writeValueAsString(settings);
            }
            if (publicId != null) {
                this.publicIdJson = mapper.writeValueAsString(publicId);
            }
            if (resultsTablePreferences != null) {
                this.resultsTablePreferencesJson = mapper.writeValueAsString(resultsTablePreferences);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error saving JSON fields", e);
        }
    }
}
