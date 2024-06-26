import { ActionIcon } from '@lobehub/ui';
import { PlusCircle } from 'lucide-react';

import { DESKTOP_HEADER_ICON_SIZE } from '@/constants/token';
import { useConfigStore } from '@/store/config';
import {useTranslation} from "react-i18next";

export default () => {
  const openPanel = useConfigStore((s) => s.openPanel);
  const { t } = useTranslation('navigation');

  return (
    <ActionIcon
      icon={PlusCircle}
      onClick={() => openPanel('market')}
      title={t('market')}
      size={DESKTOP_HEADER_ICON_SIZE}
    />
  );
};
