import { PlayCircleOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, message } from 'antd';
import React, { CSSProperties, memo, useRef } from 'react';

import { supportedLocales } from '@/constants/tts';
import { speechApi } from '@/services/tts';
import { agentSelectors, useAgentStore } from '@/store/agent';
import {useTranslation} from "react-i18next";

interface Props {
  className?: string;
  style?: CSSProperties;
}

export default memo<Props>((props) => {
  const { style, className } = props;
  const ref = useRef<HTMLAudioElement>(null);

  const tts = useAgentStore((s) => agentSelectors.currentAgentTTS(s));
  const sample = supportedLocales.find((item) => item.value === tts?.locale)?.sample;
  const { t } = useTranslation('role');

  const { loading, run: speek } = useRequest(speechApi, {
    manual: true,
    onError: (err) => {
      message.error(err.message);
      if (ref.current) {
        ref.current.pause();
        ref.current.currentTime = 0;
        ref.current.src = '';
      }
    },
    onSuccess: (res) => {
      message.success(t('voiceSettings.conversationSuccessful'));
      const adUrl = URL.createObjectURL(new Blob([res]));
      if (ref.current) {
        ref.current.src = adUrl;
        ref.current.play();
      }
    },
  });

  return (
    <>
      <Button
        htmlType="button"
        type={'primary'}
        style={style}
        className={className}
        icon={<PlayCircleOutlined />}
        loading={loading}
        onClick={() => {
          if (!tts?.locale) {
            message.error(t('voiceSettings.selectLanguage'));
            return;
          }
          if (!tts?.voice) {
            message.error(t('voiceSettings.selectVoice'));
            return;
          }
          if (sample) {
            speek({ ...tts, message: sample });
          }
        }}
      >
        {t('voiceSettings.previewVoice')}
      </Button>
      <audio ref={ref} />
    </>
  );
});
