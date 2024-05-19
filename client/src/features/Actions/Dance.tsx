import { ActionIcon } from '@lobehub/ui';
import { Music2 } from 'lucide-react';

import { useConfigStore } from '@/store/config';
import { useTranslation } from 'react-i18next';

export default () => {
  const [openPanel] = useConfigStore((s) => [s.openPanel]);
  const { t } = useTranslation('common');

  return (
    <ActionIcon
      icon={Music2}
      onClick={() => {
        openPanel('dance');
      }}
      title={t('musicAndDance')}
    />
  );
};
