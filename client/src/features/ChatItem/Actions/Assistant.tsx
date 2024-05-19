import { ActionIconGroup, useChatListActionsBar } from '@lobehub/ui';
import { ActionIconGroupItems } from '@lobehub/ui/es/ActionIconGroup';
import { Play } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import type { RenderAction } from '@/features/ChatItem/type';

const AssistantActionsBar: RenderAction = ({ onActionClick, id }) => {
  const { t } = useTranslation('common');

  const { copy, regenerate, divider, del, edit } = useChatListActionsBar({
    copy: t('copy'),
    delete: t('delete'),
    edit: t('edit'),
    regenerate: t('regenerate'),
  });

  if (id === 'default') return;

  const tts = {
    icon: Play,
    key: 'tts',
    label: t('speechSynthesis'),
  } as ActionIconGroupItems;

  return (
    <ActionIconGroup
      dropdownMenu={[tts, regenerate, copy, divider, del]}
      items={[regenerate, edit]}
      onActionClick={onActionClick}
      type="ghost"
    />
  );
};

export default memo(AssistantActionsBar);
