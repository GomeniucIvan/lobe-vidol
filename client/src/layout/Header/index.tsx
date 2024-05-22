'use client';

import { ActionIcon, Header as LobeHeader, Logo, TabsNav } from '@lobehub/ui';
import { Space, Tag, Tooltip } from 'antd';
import { GithubIcon, UserRoundPlusIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { HeaderNavKey } from '@/layout/type';

interface Props {
  headerKey?: HeaderNavKey;
}

const Header = (props: Props) => {
  const { headerKey } = props;
  const router = useRouter();
  const { t } = useTranslation('navigation');

  return (
    <LobeHeader
      actions={[
        <ActionIcon
          icon={UserRoundPlusIcon}
          key="user-plus"
          title={t('createRole')}
          onClick={() => window.open('https://github.com/lobehub/lobe-vidol-market', '_blank')}
          size="large"
        />,
        <ActionIcon
          icon={GithubIcon}
          key="github"
          title={'✨ GitHub'}
          onClick={() => window.open('https://github.com/lobehub/lobe-vidol', '_blank')}
          size="large"
        />,
      ]}
      logo={
        <Space>
          <Link href="/" style={{ color: 'inherit' }}>
            <Logo extra={'Lobe Vidol'} size={36} />
          </Link>
          <Tooltip title={t('wipInfo')}>
            <Tag color="yellow">WIP</Tag>
          </Tooltip>
        </Space>
      }
      nav={
        <TabsNav
          activeKey={headerKey}
          items={[
            {
              key: HeaderNavKey.Chat,
              label: t('chat'),
            },
            {
              key: HeaderNavKey.Role,
              label: t('role'),
            },
            {
              key: HeaderNavKey.Hub,
              label: t('hub'),
            },
            {
              key: HeaderNavKey.Market,
              label: t('market'),
            },
            {
              key: HeaderNavKey.Settings,
              label: t('settings'),
            },
          ]}
          onChange={(key) => {
            router.push(`/${key}`);
          }}
        />
      }
    />
  );
};

export default memo(Header);
