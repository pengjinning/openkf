/*
 * @Author: jack ning github@bytedesk.com
 * @Date: 2024-12-10 11:36:17
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-10 17:51:37
 * @FilePath: /backend/src/main/java/io/typebot/features/group/model/Group.java
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package io.typebot.features.group.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

import io.typebot.features.block.model.Block;

@Data
@Entity
@Table(name = "groups")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String title;
    private Integer order;
    private String graphCoordinates;

    @Column(name = "bot_id")
    private String botId;

    @OneToMany(mappedBy = "groupId", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Block> blocks;
}
