'use client';

import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';
import { useTranslation } from 'react-i18next';

import TokenMini from '@/features/Actions/TokenMini';

import { useStyles } from './style';

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

const Alert = (props: Props) => {
  const { className, style } = props;
  const { styles } = useStyles();
  const { t } = useTranslation('chat');

  return (
    <Flexbox
      horizontal
      justify={'space-between'}
      style={style}
      className={className}
      align={'center'}
    >
      <div className={styles.alert}>{t('reminderAIGeneratedContent')}</div>
      <TokenMini />
    </Flexbox>
  );
};

export default memo(Alert);
