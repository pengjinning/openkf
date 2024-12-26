/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-14 16:28:28
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-14 16:38:02
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  技术/商务联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/flow': {
        target: 'http://127.0.0.1:9003', // 你的后端 API 地址
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/backend/, ''),
      },
    },
  },
});
