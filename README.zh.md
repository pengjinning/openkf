<!--
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-09 22:12:39
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-26 17:36:55
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
nvm use 20.17.0
export http_proxy=http://127.0.0.1:10818
export https_proxy=http://127.0.0.1:10818
# https://docs.typebot.io/contribute/guides/local-installation
bun install
cp .env.dev.example .env
# 
# 获取github app id和secret
# https://docs.typebot.io/self-hosting/configuration
# https://github.com/settings/applications/ 
# https://github.com/settings/applications/2806815
GITHUB_CLIENT_ID=Ov23liyRGCjSAUFlFMNX
GITHUB_CLIENT_SECRET=209d67ffdeb53d63685acde1e9b679c46ad02121
# 
# npm config get registry
# 替换默认端口号：3000 -> 9010, 3001 -> 9011
# NEXTAUTH_URL=http://localhost:9010
# NEXT_PUBLIC_VIEWER_URL=http://localhost:9011
bunx turbo dev --filter=builder... --filter=viewer...
# 
bunx turbo build --filter=builder... --filter=viewer...
```
