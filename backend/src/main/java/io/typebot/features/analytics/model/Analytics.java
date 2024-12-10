/*
 * @Author: jack ning github@bytedesk.com
 * @Date: 2024-12-10 12:16:38
 * @LastEditors: jack ning github@bytedesk.com
 * @LastEditTime: 2024-12-10 17:10:31
 * @FilePath: /backend/src/main/java/io/typebot/features/analytics/model/Analytics.java
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package io.typebot.features.analytics.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "analytics")
public class Analytics {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    private String botId;
    private String type;
    private LocalDateTime timestamp;
    private String metadata;
} 
