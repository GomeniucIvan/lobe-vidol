import { Button } from 'antd';

import { danceListSelectors, useDanceStore } from '@/store/dance';
import { Dance } from '@/types/dance';
import { useTranslation } from 'react-i18next';

interface SubscribeButtonProps {
  dance: Dance;
}

const SubscribeButton = (props: SubscribeButtonProps) => {
  const [subscribe, unsubscribe, subscribed] = useDanceStore((s) => [
    s.subscribe,
    s.unsubscribe,
    danceListSelectors.subscribed(s),
  ]);

  const { dance } = props;

  const isSubscribed = subscribed(dance.danceId);
  const { t } = useTranslation('common');

  return (
    <Button
      onClick={() => {
        if (isSubscribed) {
          unsubscribe(dance.danceId);
        } else {
          subscribe(dance);
        }
      }}
      type={isSubscribed ? 'default' : 'primary'}
    >
      {isSubscribed ? t('unsubscribe') : t('subscribe')}
    </Button>
  );
};

export default SubscribeButton;
