import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React from 'react';

import TopBanner from '@/components/TopBanner';

import DanceCard from './Card';
import DanceList from './List';

const useStyles = createStyles(({ css }) => ({
  background: css`
    width: 90%;
    margin: -24px 0 -12px;
  `,
  container: css`
    position: relative;

    display: flex;

    width: 100%;
    height: 100%;
    min-height: 500px;
  `,
  content: css`
    overflow-y: auto;
    flex-grow: 1;
    padding-right: 24px;
    padding-left: 24px;
  `,
  title: css`
    z-index: 2;
    margin-top: 24px;
    font-size: 36px;
    font-weight: 800;
  `,
}));

interface DanceProps {
  className?: string;
  style?: React.CSSProperties;
}

const Dance = (props: DanceProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  return (
    <div className={classNames(className, styles.container)} style={style}>
      <div className={styles.content}>
        <TopBanner title="Find Your Favorite Dance" />
        <DanceList />
      </div>
      <DanceCard />
    </div>
  );
};

export default Dance;
