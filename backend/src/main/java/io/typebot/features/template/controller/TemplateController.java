package io.typebot.features.template.controller;

import io.typebot.features.template.model.Template;
import io.typebot.features.template.service.TemplateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/templates")
@RequiredArgsConstructor
public class TemplateController {
    private final TemplateService templateService;

    @PostMapping
    public ResponseEntity<Template> createTemplate(@RequestBody Template template) {
        return ResponseEntity.ok(templateService.createTemplate(template));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Template> updateTemplate(@PathVariable String id, @RequestBody Template template) {
        return ResponseEntity.ok(templateService.updateTemplate(id, template));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTemplate(@PathVariable String id) {
        templateService.deleteTemplate(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Template>> getUserTemplates(@PathVariable String userId) {
        return ResponseEntity.ok(templateService.getUserTemplates(userId));
    }

    @GetMapping("/public")
    public ResponseEntity<List<Template>> getPublicTemplates() {
        return ResponseEntity.ok(templateService.getPublicTemplates());
    }
} 