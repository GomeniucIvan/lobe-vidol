import React from 'react';

import PanelContainer from '@/panels/PanelContainer';

import Market from './Market';
import { useStyles } from './style';
import {useTranslation} from "react-i18next";

interface ControlPanelProps {
  className?: string;
  style?: React.CSSProperties;
}

const ControlPanel = (props: ControlPanelProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const { t } = useTranslation('navigation');

  return (
    <PanelContainer className={className} panelKey="market" style={style} title={t('market')}>
      <div className={styles.content}>
        <Market />
      </div>
    </PanelContainer>
  );
};

export default ControlPanel;
