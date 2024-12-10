/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-10 11:44:34
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-10 17:24:55
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  技术/商务联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
package io.typebot.features.variable.service;

import io.typebot.features.variable.model.Variable;
import io.typebot.features.variable.repository.VariableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VariableService {
    private final VariableRepository variableRepository;

    public Variable createVariable(Variable variable) {
        return variableRepository.save(variable);
    }

    public Variable updateVariable(String id, Variable variable) {
        Variable existingVariable = variableRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Variable not found"));

        existingVariable.setName(variable.getName());
        existingVariable.setType(variable.getType());
        existingVariable.setDefaultValue(variable.getDefaultValue());
        existingVariable.setBotId(variable.getBotId());

        return variableRepository.save(existingVariable);
    }

    public void deleteVariable(String id) {
        variableRepository.deleteById(id);
    }

    public List<Variable> getBotVariables(String botId) {
        return variableRepository.findByBotId(botId);
    }

    public Variable getBotVariableByName(String botId, String name) {
        return variableRepository.findByBotIdAndName(botId, name);
    }
}
