package com.bytedesk.core.workflow.variable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VariableRepository extends JpaRepository<Variable, String> {
    List<Variable> findByBotId(String botId);
    Variable findByBotIdAndName(String botId, String name);
} 
