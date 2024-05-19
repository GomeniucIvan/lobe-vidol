import { ActionIcon } from '@lobehub/ui';
import { App, Dropdown, MenuProps } from 'antd';
import { MessageCircle, MoreVertical, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useAgentStore } from '@/store/agent';
import { useSessionStore } from '@/store/session';
import { useTranslation } from 'react-i18next';

interface ActionsProps {
  id: string;
  setOpen: (open: boolean) => void;
}

export default (props: ActionsProps) => {
  const { id, setOpen } = props;
  const { modal } = App.useApp();
  const router = useRouter();
  const [unsubscribe] = useAgentStore((s) => [s.unsubscribe]);
  const currentAgent = useAgentStore((s) => s.getAgentById(id));
  const createSession = useSessionStore((s) => s.createSession);
  const { t } = useTranslation('common');

  const items: MenuProps['items'] = [
    {
      icon: <MessageCircle />,
      label: t('startChatting'),
      key: 'chat',
      onClick: ({ domEvent }) => {
        domEvent.stopPropagation();
        if (!currentAgent) return;
        createSession(currentAgent);
        router.push('/chat');
      },
    },
    {
      danger: true,
      icon: <Trash2 />,
      key: 'delete',
      label: t('deleteRole'),
      onClick: ({ domEvent }) => {
        domEvent.stopPropagation();
        modal.confirm({
          centered: true,
          okButtonProps: { danger: true },
          onOk: () => {
            unsubscribe(id);
          },
          okText: t('delete'),
          cancelText: t('cancel'),
          title: t('deleteRoleWarningMessage'),
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
