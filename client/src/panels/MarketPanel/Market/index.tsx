import { createStyles } from 'antd-style';
import React from 'react';
import { Flexbox } from 'react-layout-kit';

import TopBanner from '@/components/TopBanner';
import MarketInfo from '@/features/MarketInfo';

import AgentList from './List';

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

const Agent = () => {
  const { styles } = useStyles();

  return (
    <Flexbox flex={1} height={'100%'} width={'100%'} horizontal>
      <div className={styles.container}>
        <div className={styles.content}>
          <TopBanner title="Find Your Lovest Vidol" />
          <AgentList />
        </div>
      </div>
      <MarketInfo />
    </Flexbox>
  );
};

export default Agent;
