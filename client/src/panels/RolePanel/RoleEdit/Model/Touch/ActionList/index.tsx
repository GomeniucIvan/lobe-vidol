import { ActionIcon } from '@lobehub/ui';
import { List } from 'antd';
import { createStyles } from 'antd-style';
import { isEqual } from 'lodash-es';
import { PlayIcon } from 'lucide-react';

import { speakCharacter } from '@/features/messages/speakCharacter';
import { agentSelectors, useAgentStore } from '@/store/agent';
import { useTouchStore } from '@/store/touch';
import { useViewerStore } from '@/store/viewer';
import {useTranslation} from "react-i18next";

const useStyles = createStyles(({ css, token }) => ({
  active: css`
    background-color: ${token.controlItemBgActiveHover};
  `,
  list: css`
    width: 100%;
    padding: 24px;
  `,
  listItem: css`
    &:hover {
      cursor: pointer;
    }
  `,
}));

const AreaList = () => {
  const { styles } = useStyles();
  const { actionConfig, currentTouchArea } = useTouchStore();
  const currentAgentTTS = useAgentStore((s) => agentSelectors.currentAgentTTS(s), isEqual);
  const { t } = useTranslation('role');

  const { viewer } = useViewerStore();

  const data = actionConfig[currentTouchArea];
  return (
    <List
      className={styles.list}
      dataSource={data}
      header={<div>{t('3dModelSettings.reactionListName')}</div>}
      renderItem={(item) => (
        <List.Item
          actions={[
            <ActionIcon
              /* @ts-ignore */
              icon={PlayIcon}
              key="play"
              onClick={() => {
                speakCharacter(
                  {
                    emotion: item.emotion,
                    tts: {
                      ...currentAgentTTS,
                      message: item.text,
                    },
                  },
                  viewer,
                );
              }}
            />,
          ]}
          className={styles.listItem}
        >
          <List.Item.Meta title={item.text}></List.Item.Meta>
        </List.Item>
      )}
    />
  );
};

export default AreaList;
