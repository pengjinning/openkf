/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-09 21:24:04
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-14 15:31:02
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM –
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license.
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE
 *  contact: 270580156@qq.com
 *  技术/商务联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved.
 */
import type { GetServerSidePropsContext } from "next";
// import { getServerSession } from "next-auth";
// import { getAuthOptions } from "./api/auth/[...nextauth]";

export default function Page() {
  return null;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // const session = await getServerSession(
  //   context.req,
  //   context.res,
  //   getAuthOptions({})
  // );
  // if (!session?.user) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination:
  //         context.locale !== context.defaultLocale
  //           ? `/${context.locale}/signin`
  //           : "/signin",
  //     },
  //   };
  // }
  return {
    redirect: {
      permanent: false,
      destination:
        context.locale !== context.defaultLocale
          ? `/${context.locale}/typebots`
          : "/typebots",
    },
  };
};
