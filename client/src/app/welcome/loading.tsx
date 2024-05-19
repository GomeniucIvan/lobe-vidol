'use client';

import { createStyles } from 'antd-style';

import PageLoading from '@/components/PageLoading';
import { useTranslation } from 'react-i18next';

const useStyles = createStyles(({ css }) => ({
  content: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 64px);
  `,
}));

const Loading = () => {
  const { styles } = useStyles();
  const { t } = useTranslation('common');
  return (
    <div className={styles.content}>
      <PageLoading title={`${t('applicationLoading')}`} />
    </div>
  );
};

export default Loading;
