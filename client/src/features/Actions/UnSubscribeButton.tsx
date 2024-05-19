import { Button, Popconfirm } from 'antd';
import React from 'react';

import { agentListSelectors, useAgentStore } from '@/store/agent';
import { useSessionStore } from '@/store/session';
import { useTranslation } from 'react-i18next';

export default () => {
  const currentAgent = useAgentStore((s) => agentListSelectors.currentAgentItem(s));
  const unsubscribe = useAgentStore((s) => s.unsubscribe);
  const removeSession = useSessionStore((s) => s.removeSession);
  const { t } = useTranslation('common');

  return (
    <Popconfirm
      cancelText={t('cancel')}
      description={t('deleteRoleNameWarningMessage', { name: currentAgent?.meta.name })}
      key="delete"
      okText={t('confirm')}
      onConfirm={() => {
        if (!currentAgent) return;
        unsubscribe(currentAgent.agentId);
        removeSession(currentAgent.agentId);
      }}
      title={`${t('unsubscribe')}?`}
    >
      <Button danger>{t('deleteRole')}</Button>
    </Popconfirm>
  );
};
