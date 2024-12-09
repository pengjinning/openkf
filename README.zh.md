<!--
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-09 22:12:39
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-09 22:25:03
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  技术/商务联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
-->
# typebot

```bash
# https://docs.typebot.io/contribute/guides/local-installation
bun install
cp .env.dev.example .env
# 替换默认端口号：3000 -> 9010, 3001 -> 9011
# NEXTAUTH_URL=http://localhost:9010
# NEXT_PUBLIC_VIEWER_URL=http://localhost:9011
# 
bunx turbo dev --filter=builder... --filter=viewer...
```
