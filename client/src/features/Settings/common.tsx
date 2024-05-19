import { CheckCard } from '@ant-design/pro-card';
import {
  Form,
  FormGroup,
  FormItem,
  PrimaryColors,
  Swatches,
  findCustomThemeName,
} from '@lobehub/ui';
import { App, Button, Segmented } from 'antd';
import { ThemeMode, createStyles, useTheme } from 'antd-style';
import classNames from 'classnames';
import { Monitor, Settings2 } from 'lucide-react';
import React from 'react';

import { useAgentStore } from '@/store/agent';
import { useConfigStore } from '@/store/config';
import { useSessionStore } from '@/store/session';
import { useThemeStore } from '@/store/theme';
import { BackgroundEffect } from '@/types/config';
import { useTranslation } from 'react-i18next';

interface CommonConfigProps {
  className?: string;
  style?: React.CSSProperties;
}

const useStyles = createStyles(({ css }) => ({
  config: css`
    display: flex;
    flex-grow: 1;
    justify-content: center;
  `,
  effect: css`
    width: 160px;
    margin-bottom: 0;
  `,
}));

const CommonConfig = (props: CommonConfigProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [primaryColor, backgroundEffect] = useConfigStore((s) => [
    s.config.primaryColor,
    s.config.backgroundEffect,
  ]);
  const clearAgentStorage = useAgentStore((s) => s.clearAgentStorage);
  const [themeMode, setThemeMode] = useThemeStore((s) => [s.themeMode, s.setThemeMode]);
  const setConfig = useConfigStore((s) => s.setConfig);
  const theme = useTheme();
  const clearSessions = useSessionStore((s) => s.clearSessions);
  const resetConfig = useConfigStore((s) => s.resetConfig);
  const { message, modal } = App.useApp();
  const { t } = useTranslation(['setting', 'common']);

  const handleClear = () => {
    modal.confirm({
      cancelText: t('cancel'),
      centered: true,
      content: t('irreversibleActionWarning'),
      okButtonProps: {
        danger: true,
      },
      okText: t('confirm'),
      onOk: () => {
        clearSessions();
        clearAgentStorage();
        message.success(t('clearSuccess'));
      },
      title: t('confirmClearAllMessages'),
    });
  };

  const handleReset = () => {
    modal.confirm({
      cancelText: t('cancel'),
      centered: true,
      content: t('irreversibleResetWarning'),
      okButtonProps: {
        danger: true,
      },
      okText: t('confirm'),
      onOk: () => {
        resetConfig();
        message.success(t('resetSuccess'));
      },
      title: t('confirmResetAllSystemSettings'),
    });
  };

  return (
    <div className={classNames(styles.config, className)} style={style}>
      <Form style={{ display: 'flex', flexGrow: 1 }}>
        <FormGroup icon={Settings2} title={t('themeSettings')}>
          <FormItem desc={t('themeColor')} divider label={t('customThemeColor')} name={'primaryColor'}>
            <Swatches
              activeColor={primaryColor}
              colors={[
                theme.red,
                theme.orange,
                theme.gold,
                theme.yellow,
                theme.lime,
                theme.green,
                theme.cyan,
                theme.blue,
                theme.geekblue,
                theme.purple,
                theme.magenta,
                theme.volcano,
              ]}
              onSelect={(color: any) => {
                const name = findCustomThemeName('primary', color) as PrimaryColors;
                setConfig({ primaryColor: name || '' });
              }}
            />
          </FormItem>
          <FormItem desc={t('customThemeMode')} divider label={t('themeMode')} name={'themeMode'}>
            <CheckCard.Group
              defaultValue={themeMode}
              onChange={(value) => {
                setThemeMode(value as ThemeMode);
              }}
              size="small"
            >
              <CheckCard className={styles.effect} title={`🔆 ${t('lightMode')}`} value="light" />
              <CheckCard className={styles.effect} title={`🌙 ${t('darkMode')}`} value="dark" />
              <CheckCard className={styles.effect} title={`💻 ${t('followSystem')}`} value="auto" />
            </CheckCard.Group>
          </FormItem>
          <FormItem
            desc={t('customBackgroundEffect')}
            divider
            label={t('backgroundEffect')}
            name={'backgroundEffect'}
          >
            <Segmented
              defaultValue={backgroundEffect}
              onChange={(value: BackgroundEffect) => {
                setConfig({ backgroundEffect: value });
              }}
              options={[
                {
                  label: t('glow'),
                  value: 'glow',
                },
                {
                  label: t('none'),
                  value: 'none',
                },
              ]}
            />
          </FormItem>
        </FormGroup>
        <FormGroup icon={Monitor} title={t('systemSettings')}>
          <FormItem
            desc={t('clearAllConversationData')}
            divider
            label={t('clearAllConversationMessages')}
          >
            <Button danger onClick={handleClear} type={'primary'}>
              {t('clearImmediately')}
            </Button>
          </FormItem>
          <FormItem
            desc={t('resetAllSystemSettings')}
            divider
            label={t('resetSystemSettings')}
          >
            <Button danger onClick={handleReset} type={'primary'}>
              {t('resetImmediately')}
            </Button>
          </FormItem>
        </FormGroup>
      </Form>
    </div>
  );
};

export default CommonConfig;
