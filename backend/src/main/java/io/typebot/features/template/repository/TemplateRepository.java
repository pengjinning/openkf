package io.typebot.features.template.repository;

import io.typebot.features.template.model.Template;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TemplateRepository extends JpaRepository<Template, String> {
    List<Template> findByCreatedByAndIsPublicFalse(String userId);
    List<Template> findByIsPublicTrue();
    List<Template> findByCategory(String category);
} 
