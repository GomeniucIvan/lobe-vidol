import { copyToClipboard } from '@lobehub/ui';
import { App } from 'antd';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { OnActionsClick, RenderAction } from '@/features/ChatItem/type';
import { handleSpeakAi } from '@/services/chat';
import { useSessionStore } from '@/store/session';
import { LLMRoleType } from '@/types/llm';

import AssistantActionsBar from './Assistant';
import SystemActionBar from './System';
import UserActionsBar from './User';

export const renderActions: Record<LLMRoleType, RenderAction> = {
  assistant: AssistantActionsBar,
  user: UserActionsBar,
  system: SystemActionBar,
};

export const useActionsClick = (): OnActionsClick => {
  const [deleteMessage, regenerateMessage] = useSessionStore((s) => [
    s.deleteMessage,
    s.regenerateMessage,
  ]);
  const { message } = App.useApp();

  return useCallback<OnActionsClick>(async (action, { id, content, error }) => {
    const { t } = useTranslation('common');

    switch (action.key) {
      case 'copy': {
        await copyToClipboard(content);
        message.success(t('copySuccess'));
        break;
      }

      case 'del': {
        deleteMessage(id);
        break;
      }

      case 'regenerate': {
        regenerateMessage(id);
        // if this message is an error message, we need to delete it
        if (error) deleteMessage(id);
        break;
      }

      case 'delAndRegenerate': {
        regenerateMessage(id);
        deleteMessage(id);
        break;
      }

      case 'tts': {
        handleSpeakAi(content);
        break;
      }
    }
  }, []);
};
