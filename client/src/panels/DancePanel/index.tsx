'use client';

import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';
import React, { useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import AudioPlayer from '@/features/AudioPlayer';
import PanelContainer from '@/panels/PanelContainer';

import Dance from './Dance';
import Market from './Market';
import {useTranslation} from "react-i18next";

interface DancePanelProps {
  className?: string;
  style?: React.CSSProperties;
}

const DancePanel = (props: DancePanelProps) => {
  const { style, className } = props;
  const [tab, setTab] = useState('dance');
  const { t } = useTranslation(['navigation', 'common']);

  const options = [
    { value: 'dance', label: t('dance'), icon: <BarsOutlined /> },
    { value: 'market', label: t('market'), icon: <AppstoreOutlined /> },
  ];

  return (
    <PanelContainer
      className={className}
      panelKey="dance"
      style={style}
      title={t('musicAndDance')}
      extra={<Segmented options={options} size="small" value={tab} onChange={setTab} />}
      footer={
        <Flexbox style={{ padding: 8 }} flex={1}>
          <AudioPlayer />
        </Flexbox>
      }
    >
      {tab === 'dance' ? <Dance setTab={setTab} /> : <Market />}
    </PanelContainer>
  );
};

export default DancePanel;
