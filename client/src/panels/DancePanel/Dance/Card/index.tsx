import { DraggablePanel } from '@lobehub/ui';
import { Button, Popconfirm, message } from 'antd';
import { createStyles } from 'antd-style';
import React, { memo, useState } from 'react';

import DanceInfo from '@/components/DanceInfo';
import { SIDEBAR_MAX_WIDTH, SIDEBAR_WIDTH } from '@/constants/token';
import { danceListSelectors, useDanceStore } from '@/store/dance';
import { useTranslation } from 'react-i18next';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    display: flex;
    flex-direction: column;
    height: 100% !important;
  `,
  header: css`
    border-bottom: 1px solid ${token.colorBorder};
  `,
}));

// eslint-disable-next-line react/display-name
const SideBar = memo(() => {
  const { styles } = useStyles();
  const [tempId, setTempId] = useState<string>('');
  const [
    showDanceSidebar,
    activateDance,
    deactivateDance,
    addAndPlayItem,
    addToPlayList,
    unsubscribe,
  ] = useDanceStore((s) => [
    danceListSelectors.showSideBar(s),
    s.activateDance,
    s.deactivateDance,
    s.addAndPlayItem,
    s.addToPlayList,
    s.unsubscribe,
  ]);

  const currentDance = useDanceStore((s) => danceListSelectors.currentDanceItem(s));
  const { t } = useTranslation('common');

  return (
    <DraggablePanel
      classNames={{ content: styles.content }}
      defaultSize={{ width: SIDEBAR_WIDTH }}
      expand={showDanceSidebar}
      maxWidth={SIDEBAR_MAX_WIDTH}
      minWidth={SIDEBAR_WIDTH}
      mode={'fixed'}
      onExpandChange={(show) => {
        if (!show) {
          setTempId(useDanceStore.getState().currentIdentifier);
          deactivateDance();
        } else if (tempId) {
          activateDance(tempId);
        }
      }}
      placement={'right'}
    >
      <DanceInfo
        actions={[
          <Button
            key="play"
            onClick={() => {
              if (currentDance) {
                addAndPlayItem(currentDance);
              }
            }}
            type={'primary'}
          >
            {t('play')}
          </Button>,
          <Button
            key="play"
            onClick={() => {
              if (currentDance) {
                addToPlayList(currentDance);
                message.success(t('addedToPlaylist'));
              }
            }}
          >
            {t('addToList')}
          </Button>,
          <Popconfirm
            cancelText={t('cancel')}
            description={t('cancelSubscriptionMusic', { name: currentDance?.name })}
            key="delete"
            okText={t('confirm')}
            onConfirm={() => {
              if (currentDance) {
                unsubscribe(currentDance.danceId);
              }
            }}
            title={`${t('unsubscribe')}?`}
          >
            <Button danger>{t('unsubscribe')}</Button>
          </Popconfirm>,
        ]}
        dance={currentDance}
      />
    </DraggablePanel>
  );
});

export default SideBar;
