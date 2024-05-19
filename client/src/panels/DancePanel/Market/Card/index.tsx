import { DraggablePanel } from '@lobehub/ui';
import { Button, message } from 'antd';
import { createStyles } from 'antd-style';
import React, { memo, useState } from 'react';

import Author from '@/components/Author';
import DanceInfo from '@/components/DanceInfo';
import { SIDEBAR_MAX_WIDTH, SIDEBAR_WIDTH } from '@/constants/common';
import { danceListSelectors, useDanceStore } from '@/store/dance';
import { marketStoreSelectors, useMarketStore } from '@/store/market';
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

const Header = () => {
  const { styles } = useStyles();
  const [tempId, setTempId] = useState<string>('');
  const { t } = useTranslation('common');

  const [showDanceSidebar, activateDance, deactivateDance, currentDanceItem] = useMarketStore(
    (s) => [
      marketStoreSelectors.showDanceSideBar(s),
      s.activateDance,
      s.deactivateDance,
      marketStoreSelectors.currentDanceItem(s),
    ],
  );

  const [subscribe, unsubscribe, subscribed, addAndPlayItem, addToPlayList] = useDanceStore((s) => [
    s.subscribe,
    s.unsubscribe,
    danceListSelectors.subscribed(s),
    s.addAndPlayItem,
    s.addToPlayList,
  ]);

  const actions = [];
  if (currentDanceItem) {
    const isSubscribed = subscribed(currentDanceItem.danceId);

    if (isSubscribed) {
      actions.push([
        <Button
          key="play"
          onClick={() => {
            if (currentDanceItem) {
              addAndPlayItem(currentDanceItem);
            }
          }}
          type={'primary'}
        >
          {t('play')}
        </Button>,
        <Button
          key="add"
          onClick={() => {
            if (currentDanceItem) {
              addToPlayList(currentDanceItem);
              message.success(t('addedToPlaylist'));
            }
          }}
        >
          {t('addToList')}
        </Button>,
      ]);
    }

    actions.push(
      <Button
        onClick={() => {
          if (isSubscribed) {
            unsubscribe(currentDanceItem.danceId);
          } else {
            subscribe(currentDanceItem);
          }
        }}
        type={isSubscribed ? 'default' : 'primary'}
      >
        {isSubscribed ? t('unsubscribe') : t('subscribe')}
      </Button>,
    );
  }

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
          setTempId(useMarketStore.getState().currentDanceId);
          deactivateDance();
        } else if (tempId) {
          activateDance(tempId);
        }
      }}
      placement={'right'}
    >
      <DanceInfo
        actions={actions}
        dance={currentDanceItem}
        extra={<Author item={currentDanceItem} />}
      />
    </DraggablePanel>
  );
};

export default memo(Header);
