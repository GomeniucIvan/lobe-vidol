import { ActionIconGroup, useChatListActionsBar } from '@lobehub/ui';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import type { RenderAction } from '@/features/ChatItem/type';

const UserActionsBar: RenderAction = ({ onActionClick }) => {
  const { t } = useTranslation('common');

  const { copy, divider, del, edit } = useChatListActionsBar({
    copy: t('copy'),
    delete: t('delete'),
    edit: t('edit'),
    regenerate: t('regenerate'),
  });
  return (
    <ActionIconGroup
      dropdownMenu={[copy, divider, del]}
      items={[edit]}
      onActionClick={onActionClick}
      type="ghost"
    />
  );
};

export default memo(UserActionsBar);
