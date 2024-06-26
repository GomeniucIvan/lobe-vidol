import { TabsNav } from '@lobehub/ui';
import React, { memo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';
import { useTranslation } from 'react-i18next';

import CommonConfig from './common';
import ServerConfig from './server';

interface ConfigProps {
  className?: string;
  style?: React.CSSProperties;
}

const Config = (props: ConfigProps) => {
  const { style, className } = props;
  const [tab, setTab] = useState('common');
  const { t } = useTranslation('setting');

  return (
    <Flexbox flex={1} width={'100%'} height={'100%'} className={className} style={style}>
      <div style={{ marginBottom: 12 }}>
        <TabsNav
          activeKey={tab}
          items={[
            {
              key: 'common',
              label: t('generalSettings'),
            },
            {
              key: 'serverSettings',
              label: t('serverSettings'),
            },
          ]}
          onChange={(key) => {
            setTab(key);
          }}
        />
      </div>
      <Flexbox flex={1} width={'100%'} height={'100%'}>
        {tab === 'serverSettings' ? <ServerConfig /> : null}
        {tab === 'common' ? <CommonConfig /> : null}
      </Flexbox>
    </Flexbox>
  );
};

export default memo(Config);
