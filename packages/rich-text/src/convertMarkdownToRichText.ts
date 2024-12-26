/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-09 21:24:05
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-12 10:37:27
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  技术/商务联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
import {
  type Value,
  createPlateEditor,
  createPluginFactory,
  getPluginOptions,
  isUrl,
} from "@udecode/plate-common";
import markdown from "remark-parse";
import { unified } from "unified";

import { deserialize } from "./deserializer/deserialize";
import type { DeserializeMdPlugin } from "./deserializer/types";
import { remarkDefaultElementRules } from "./remark-slate/remarkDefaultElementRules";
import { remarkDefaultTextRules } from "./remark-slate/remarkDefaultTextRules";
import { remarkPlugin } from "./remark-slate/remarkPlugin";
import type { RemarkPluginOptions } from "./remark-slate/types";

export const convertMarkdownToRichText = <V extends Value>(data: string) => {
  const plugins = [createDeserializeMdPlugin()];
  const editor = createPlateEditor({ plugins }) as unknown as any;
  const { elementRules, textRules, indentList } = getPluginOptions<
    DeserializeMdPlugin,
    V
  >(editor, KEY_DESERIALIZE_MD);

  const tree: any = unified()
    .use(markdown)
    .use(remarkPlugin, {
      editor,
      elementRules,
      textRules,
      indentList,
    } as unknown as RemarkPluginOptions<V>)
    .processSync(data);

  return tree.result;
};

export const KEY_DESERIALIZE_MD = "deserializeMd";

const createDeserializeMdPlugin = createPluginFactory<DeserializeMdPlugin>({
  key: KEY_DESERIALIZE_MD,
  then: (editor) => ({
    editor: {
      insertData: {
        format: "text/plain",
        query: ({ data, dataTransfer }) => {
          const htmlData = dataTransfer.getData("text/html");
          if (htmlData) return false;

          const { files } = dataTransfer;
          if (
            !files?.length && // if content is simply a URL pass through to not break LinkPlugin
            isUrl(data)
          ) {
            return false;
          }
          return true;
        },
        getFragment: ({ data }) => deserialize<Value>(editor, data),
      },
    },
  }),
  options: {
    elementRules: remarkDefaultElementRules,
    textRules: remarkDefaultTextRules,
    indentList: false,
  },
});
