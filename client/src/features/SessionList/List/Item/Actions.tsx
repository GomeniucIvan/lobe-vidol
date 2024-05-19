import { ActionIcon } from '@lobehub/ui';
import { App, Dropdown, MenuProps } from 'antd';
import { MoreVertical, Trash2 } from 'lucide-react';

import { useSessionStore } from '@/store/session';
import { useTranslation } from 'react-i18next';

interface ActionsProps {
  id: string;
  setOpen: (open: boolean) => void;
}

export default (props: ActionsProps) => {
  const { id, setOpen } = props;
  const { modal } = App.useApp();
  const [removeSession] = useSessionStore((s) => [s.removeSession]);
  const { t } = useTranslation('common');

  const items: MenuProps['items'] = [
    {
      danger: true,
      icon: <Trash2 />,
      key: 'delete',
      label: t('deleteSession'),
      onClick: ({ domEvent }) => {
        domEvent.stopPropagation();
        modal.confirm({
          centered: true,
          okButtonProps: { danger: true },
          onOk: () => {
            removeSession(id);
          },
          okText: t('delete'),
          cancelText: t('cancel'),
          title: t('deleteConversationWarningMessage'),
        });
      },
    },
  ];
  return (
    <Dropdown
      menu={{
        items,
        onClick: ({ domEvent }) => {
          domEvent.stopPropagation();
        },
      }}
      onOpenChange={(open) => setOpen(open)}
      trigger={['click']}
    >
      <ActionIcon
        icon={MoreVertical}
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
    </Dropdown>
  );
};
