import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import { Eraser, Music } from 'lucide-react';
import React, { memo } from 'react';

import { useConfigStore } from '@/store/config';
import { useSessionStore } from '@/store/session';
import { useTranslation } from 'react-i18next';

import Item from './Item';

const { confirm } = Modal;

export interface MyListProps {
  mobile?: boolean;
}

const Operations = memo<MyListProps>(({ mobile }) => {
  const [openPanel] = useConfigStore((s) => [s.openPanel]);
  const [clearHistory] = useSessionStore((s) => [s.clearHistory]);
  const { t } = useTranslation('common');

  const items = [
    // {
    //   icon: SquarePen,
    //   label: '新话题',
    //   key: 'new-topic',
    //   onClick: () => {},
    // },
    // {
    //   icon: History,
    //   label: '聊天历史记录',
    //   key: 'history',
    //   onClick: () => {
    //     // openPanel('role');
    //   },
    // },
    // {
    //   icon: Settings2Icon,
    //   label: '对话设定',
    //   key: 'setting',
    //   onClick: () => {
    //     Modal.info({ title: '对话设定', content: '暂未开放' });
    //   },
    // },
    {
      icon: Music,
      key: 'music',
      label: t('musicAndDance'),
      onClick: () => {
        openPanel('dance');
      },
    },
    {
      icon: Eraser,
      label: t('clear'),
      key: 'context',
      onClick: () => {
        confirm({
          title: t('confirmDeleteHistoryMessages'),
          icon: <ExclamationCircleFilled />,
          content: t('irreversibleAction'),
          okText: t('confirm'),
          cancelText: t('clear'),
          onOk() {
            clearHistory();
          },
          onCancel() {},
        });
      },
    },
  ];

  return (
    <>
      {items.map(({ icon, label, onClick }) => (
        <Item hoverable={!mobile} icon={icon} label={label} key={label} onClick={onClick} />
      ))}
    </>
  );
});

export default Operations;
