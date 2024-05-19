import { Analytics } from '@vercel/analytics/react';
import { cookies } from 'next/headers';
import { PropsWithChildren } from 'react';

import { VIDOL_THEME_APPEARANCE } from '@/constants/common';
import Layout from '@/layout';

import StyleRegistry from './StyleRegistry';
import {LOBE_LOCALE_COOKIE} from "@/constants/locale";
import {getAntdLocale} from "@/utils/locale";
import Locale from "@/layout/GlobalProvider/Locale";

const RootLayout = async ({ children }: PropsWithChildren) => {
  // get default theme config to use with ssr
  const cookieStore = cookies();
  const appearance = cookieStore.get(VIDOL_THEME_APPEARANCE);

  const defaultLang = cookieStore.get(LOBE_LOCALE_COOKIE);
  const antdLocale = await getAntdLocale(defaultLang?.value);

  return (
    <html lang="cn" suppressHydrationWarning>
    <body>
    <StyleRegistry>
      <Locale antdLocale={antdLocale} defaultLang={defaultLang?.value}>
        <Layout defaultAppearance={appearance?.value}>{children}</Layout>
      </Locale>
    </StyleRegistry>
    <Analytics />
    </body>
    </html>
  );
};

export default RootLayout;

export { default as metadata } from './metadata';
