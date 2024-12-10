/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-10 16:04:23
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-10 16:46:40
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM –
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license.
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE
 *  contact: 270580156@qq.com
 *  技术/商务联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved.
 */
import { Icon, IconProps } from "@chakra-ui/react";

export const PlusIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </Icon>
);

export default PlusIcon;
