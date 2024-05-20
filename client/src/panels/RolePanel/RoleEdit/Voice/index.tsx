import { Form, FormItem } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React from 'react';

import { INPUT_WIDTH_M } from '@/constants/token';
import TTSEngine from '@/panels/RolePanel/RoleEdit/Voice/TTSEngine';
import TTSLocale from '@/panels/RolePanel/RoleEdit/Voice/TTSLocale';
import TTSPitch from '@/panels/RolePanel/RoleEdit/Voice/TTSPitch';
import TTSPlay from '@/panels/RolePanel/RoleEdit/Voice/TTSPlay';
import TTSSpeed from '@/panels/RolePanel/RoleEdit/Voice/TTSSpeed';
import TTSVoice from '@/panels/RolePanel/RoleEdit/Voice/TTSVoice';
import {useTranslation} from "react-i18next";

interface ConfigProps {
  className?: string;
  style?: React.CSSProperties;
}

const useStyles = createStyles(({ css, token }) => ({
  audio: css`
    margin-top: 20px;
  `,
  config: css`
    padding: 12px;
    border-radius: ${token.borderRadius}px;
  `,
  container: css`
    display: flex;
    flex-direction: column;
  `,
}));

export default (props: ConfigProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const { t } = useTranslation('role');

  return (
    <Form layout="horizontal" preserve={false} requiredMark={false}>
      <div className={classNames(className, styles.container)} style={style}>
        <div className={styles.config}>
          <FormItem label={t('voiceSettings.speechEngine')} name={'engine'} desc={t('voiceSettings.speechEngineDescription')}>
            <TTSEngine style={{ width: INPUT_WIDTH_M }} />
          </FormItem>
          <FormItem
            label={t('voiceSettings.language')}
            name={'locale'}
            divider
            desc={t('voiceSettings.languageDescription')}
          >
            <TTSLocale style={{ width: INPUT_WIDTH_M }} />
          </FormItem>
          <FormItem label={t('voiceSettings.voice')} divider name={'voice'} desc={t('voiceSettings.voiceDescription')}>
            <TTSVoice style={{ width: INPUT_WIDTH_M }} />
          </FormItem>
          <FormItem label={t('voiceSettings.speed')} name={'speed'} desc={t('voiceSettings.speedDescription')} divider>
            <TTSSpeed style={{ width: INPUT_WIDTH_M }} />
          </FormItem>
          <FormItem label={t('voiceSettings.pitch')} name={'pitch'} desc={t('voiceSettings.pitchDescription')} divider>
            <TTSPitch style={{ width: INPUT_WIDTH_M }} />
          </FormItem>
          <FormItem label={t('voiceSettings.audition')} desc={t('voiceSettings.auditionDescription')} divider>
            <TTSPlay style={{ width: INPUT_WIDTH_M }} />
          </FormItem>
        </div>
      </div>
    </Form>
  );
};
