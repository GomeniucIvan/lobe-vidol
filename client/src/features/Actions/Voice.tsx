import { ActionIcon } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { Volume2, VolumeXIcon } from 'lucide-react';

import { DESKTOP_HEADER_ICON_SIZE } from '@/constants/token';
import { toogleVoice } from '@/services/chat';
import { useSessionStore } from '@/store/session';
import { useTranslation } from 'react-i18next';

const useStyles = createStyles(({ token, css }) => ({
  voice: css`
    cursor: pointer;
    transition: color 0.3s;
  `,
  voiceOn: css`
    color: ${token.colorLinkActive};
  `,
}));

const VoiceSwitch = () => {
  const { styles } = useStyles();
  const [voiceOn] = useSessionStore((s) => [s.voiceOn]);
  const { t } = useTranslation('common');

  return (
    <ActionIcon
      className={classNames(styles.voice, voiceOn && styles.voiceOn)}
      icon={voiceOn ? Volume2 : VolumeXIcon}
      onClick={toogleVoice}
      size={DESKTOP_HEADER_ICON_SIZE}
      title={t('speechSynthesis')}
    />
  );
};

export default VoiceSwitch;
