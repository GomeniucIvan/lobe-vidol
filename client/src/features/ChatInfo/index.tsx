'use client';

import { DraggablePanel } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import React from 'react';

import AgentCard from '@/components/agent/AgentCard';
import { SIDEBAR_WIDTH } from '@/constants/token';
import MiniPlayer from '@/features/AudioPlayer/MiniPlayer';
import { useGlobalStore } from '@/store/global';
import { sessionSelectors, useSessionStore } from '@/store/session';

import Operations from './Operations';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    position: relative;
    display: flex;
    flex-direction: column;
  `,
  header: css`
    border-bottom: 1px solid ${token.colorBorder};
  `,
}));

export default () => {
  const [showChatSidebar, setChatSidebar] = useGlobalStore((s) => [
    s.showChatSidebar,
    s.setChatSidebar,
  ]);
  const { styles } = useStyles();
  const [currentAgent] = useSessionStore((s) => [sessionSelectors.currentAgent(s)]);

  return (
    <DraggablePanel
      classNames={{ content: styles.content }}
      minWidth={SIDEBAR_WIDTH}
      maxWidth={SIDEBAR_WIDTH}
      mode={'fixed'}
      onExpandChange={(expand) => setChatSidebar(expand)}
      expand={showChatSidebar}
      placement={'right'}
    >
      <AgentCard agent={currentAgent} extra={<MiniPlayer />} footer={<Operations />} />
    </DraggablePanel>
  );
};
