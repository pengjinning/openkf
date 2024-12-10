/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-10 11:35:03
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-10 21:35:09
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  技术/商务联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
package io.typebot.features.template.service;

import io.typebot.features.template.model.Template;
import io.typebot.features.template.repository.TemplateRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TemplateService {
  private final TemplateRepository templateRepository;

  public Template createTemplate(Template template) {
    return templateRepository.save(template);
  }

  public Template updateTemplate(String id, Template template) {
    Template existingTemplate = templateRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Template not found"));

    existingTemplate.setName(template.getName());
    existingTemplate.setDescription(template.getDescription());
    existingTemplate.setCategory(template.getCategory());
    existingTemplate.setSettings(template.getSettings());
    existingTemplate.setPublic(template.isPublic());

    return templateRepository.save(existingTemplate);
  }

  public void deleteTemplate(String id) {
    templateRepository.deleteById(id);
  }

  public Template getTemplate(String id) {
    return templateRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Template not found"));
  }

  public List<Template> getPublicTemplates() {
    return templateRepository.findByIsPublicTrue();
  }

  public List<Template> getTemplatesByCategory(String category) {
    return templateRepository.findByCategory(category);
  }

  public List<Template> getUserTemplates(String userId) {
    return templateRepository.findByCreatedByAndIsPublicFalse(userId);
  }
}
