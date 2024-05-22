'use client';

import React, { ReactNode, memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import AppLayout from '@/layout/AppLayout';
import { HeaderNavKey } from '@/layout/type';
import TopBanner from "@/components/TopBanner";
import MarketInfo from "@/features/MarketInfo";
import {createStyles} from "antd-style";
import HubSearchBar from "@/app/hub/features/HubSearchBar";
import {isMobileDevice} from "@/utils/responsive";
import TagList from "@/app/hub/features/TagList";

export interface LayoutProps {
  children?: ReactNode;
}

const useStyles = createStyles(({ css }) => ({
  container: css`
    overflow-y: auto;

    width: 100%;
    height: 100%;
    min-height: 500px;
    padding: 0 24px;
  `,
  content: css`
    max-width: 1024px;
    margin: 0 auto;
  `,
  title: css`
    z-index: 2;
    margin-top: 24px;
    font-size: 36px;
    font-weight: 800;
  `,
}));

const Layout = (props: LayoutProps) => {
  const { children } = props;
  const { styles } = useStyles();
  const mobile = isMobileDevice();

  return (
    <AppLayout headerKey={HeaderNavKey.Hub}>
      <Flexbox flex={1} height={'100%'} width={'100%'} horizontal>
        <div className={styles.container}>
          <div className={styles.content}>
            <TopBanner title="Find Your Lovest Vidol" />
            <HubSearchBar />

            <Flexbox gap={mobile ? 16 : 24}>
              <TagList />

              {children}
            </Flexbox>
          </div>
        </div>
        <MarketInfo />
      </Flexbox>
    </AppLayout>
  );
};

export default memo(Layout);
