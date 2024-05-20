import { TokenTag } from '@lobehub/ui';
import { isEqual } from 'lodash-es';

import { OPENAI_MODEL_LIST } from '@/constants/openai';
import { useCalculateToken } from '@/hooks/useCalculateToken';
import { configSelectors, useConfigStore } from '@/store/config';
import { useTranslation } from 'react-i18next';

const Token = () => {
  const config = useConfigStore((s) => configSelectors.currentServerConfig(s), isEqual);
  const usedTokens = useCalculateToken();
  const { t } = useTranslation('common');

  return (
    <TokenTag
      maxValue={OPENAI_MODEL_LIST.find((item) => item.name === config?.model)?.maxToken || 4096}
      value={usedTokens}
      text={{ overload: t('tokenExceeded'), remained: t('remainingTokens'), used: t('tokenUsed') }}
    />
  );
};

export default Token;
