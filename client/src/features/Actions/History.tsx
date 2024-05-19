import { ActionIcon } from '@lobehub/ui';
import { Popconfirm } from 'antd';
import { Eraser } from 'lucide-react';

import { useSessionStore } from '@/store/session';
import { useTranslation } from 'react-i18next';

const History = () => {
  const { t } = useTranslation('common');
  const [clearHistory] = useSessionStore((s) => [s.clearHistory]);
  return (
    <Popconfirm
      cancelText={t('cancel')}
      description={t('irreversibleAction')}
      okText={t('confirm')}
      onConfirm={clearHistory}
      title={t('confirmDeleteHistoryMessages')}
    >
      <ActionIcon icon={Eraser} title={t('clear')} />
    </Popconfirm>
  );
};

export default History;
