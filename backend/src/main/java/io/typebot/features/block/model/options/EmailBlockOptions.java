package io.typebot.features.block.model.options;

import io.typebot.features.block.model.BlockOptions;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.List;
import java.util.Map;

@Data
@EqualsAndHashCode(callSuper = true)
public class EmailBlockOptions extends BlockOptions {
    private String from;
    private String to;
    private List<String> cc;
    private List<String> bcc;
    private String subject;
    private String body;
    private String replyTo;
    private List<Attachment> attachments;
    private EmailProvider provider;
    private Map<String, String> credentials;
}