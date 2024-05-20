import { Tooltip, Typography } from 'antd';
import { isEqual } from 'lodash-es';

import { OPENAI_MODEL_LIST } from '@/constants/openai';
import { useCalculateToken } from '@/hooks/useCalculateToken';
import { configSelectors, useConfigStore } from '@/store/config';
import {useTranslation} from "react-i18next";

const TokenMini = () => {
  const config = useConfigStore((s) => configSelectors.currentServerConfig(s), isEqual);
  const usedTokens = useCalculateToken();
  const maxValue = OPENAI_MODEL_LIST.find((item) => item.name === config?.model)?.maxToken || 4096;
  const { t } = useTranslation('conversation');

  return (
    <Tooltip title={t('tokenInfoTooltip')}>
      <Typography.Text type={'secondary'}>
        Token Count: {usedTokens} / {maxValue}
      </Typography.Text>
    </Tooltip>
  );
};

export default TokenMini;
