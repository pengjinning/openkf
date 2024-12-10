package io.typebot.features.edge.service;

import io.typebot.features.edge.model.Edge;
import io.typebot.features.edge.repository.EdgeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EdgeService {
    private final EdgeRepository edgeRepository;
    
    public Edge createEdge(Edge edge) {
        return edgeRepository.save(edge);
    }
    
    public void deleteEdge(String id) {
        edgeRepository.deleteById(id);
    }
    
    public List<Edge> getBotEdges(String botId) {
        return edgeRepository.findByBotId(botId);
    }
    
    public List<Edge> getGroupOutgoingEdges(String groupId) {
        return edgeRepository.findByFromGroupId(groupId);
    }
    
    public List<Edge> getGroupIncomingEdges(String groupId) {
        return edgeRepository.findByToGroupId(groupId);
    }
} 
