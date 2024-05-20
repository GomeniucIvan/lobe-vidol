import { Form, FormGroup, FormItem } from '@lobehub/ui';
import { App, Button, Input, Segmented } from 'antd';
import { ThemeMode, createStyles } from 'antd-style';
import classNames from 'classnames';
import { isEqual } from 'lodash-es';
import { Monitor, Settings2, User2Icon } from 'lucide-react';
import React from 'react';

import { MAX_NAME_LENGTH } from '@/constants/common';
import ThemeSwatchesPrimary from '@/features/Settings/features/ThemeSwatchesPrimary';
import { useSyncSettings } from '@/features/Settings/useSyncSettings';
import { useAgentStore } from '@/store/agent';
import { useConfigStore } from '@/store/config';
import { useSessionStore } from '@/store/session';
import { useThemeStore } from '@/store/theme';
import { BackgroundEffect } from '@/types/config';
import { useTranslation } from 'react-i18next';

import AvatarWithUpload from './features/AvatarWithUpload';

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
  const [config, setConfig] = useConfigStore((s) => [s.config, s.setConfig], isEqual);
  const clearAgentStorage = useAgentStore((s) => s.clearAgentStorage);
  const [themeMode, setThemeMode] = useThemeStore((s) => [s.themeMode, s.setThemeMode]);
  const clearSessions = useSessionStore((s) => s.clearSessions);
  const resetConfig = useConfigStore((s) => s.resetConfig);
  const { message, modal } = App.useApp();
  const { t } = useTranslation(['setting', 'common']);

  const [form] = Form.useForm();

  useSyncSettings(form);

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
      <Form
        style={{ display: 'flex', flexGrow: 1 }}
        initialValues={config}
        form={form}
        onValuesChange={setConfig}
      >
        <FormGroup icon={User2Icon} title={t('userSettings')}>
          <FormItem desc={t('customAvatarDescription')} divider label={t('customAvatar')} name={'avatar'}>
            <AvatarWithUpload />
          </FormItem>
          <FormItem desc={t('nickNameDescription')} divider label={t('nickName')} name={'nickName'}>
            <Input
              defaultValue={config.nickName}
              placeholder={t('nickNamePlaceholder')}
              maxLength={MAX_NAME_LENGTH}
              showCount
              onChange={(e) => {
                setConfig({ nickName: e.target.value });
              }}
            />
          </FormItem>
        </FormGroup>
        <FormGroup icon={Settings2} title={t('themeSettings')}>
          <FormItem desc={t('themeColor')} divider label={t('customThemeColor')} name={'primaryColor'}>
            <ThemeSwatchesPrimary />
          </FormItem>
          <FormItem desc={t('customThemeMode')} divider label={t('themeMode')} name={'themeMode'}>
            <Segmented
              defaultValue={themeMode}
              onChange={(value: ThemeMode) => {
                setThemeMode(value as ThemeMode);
              }}
              options={[
                {
                  label: `🔆 ${t('lightMode')}`,
                  value: 'light',
                },
                {
                  label: `🌙 ${t('darkMode')}`,
                  value: 'dark',
                },
                {
                  label: `💻 ${t('followSystem')}`,
                  value: 'auto',
                },
              ]}
            />
          </FormItem>
          <FormItem
            desc={t('customBackgroundEffect')}
            divider
            label={t('backgroundEffect')}
            name={'backgroundEffect'}
          >
            <Segmented
              defaultValue={config.backgroundEffect}
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
