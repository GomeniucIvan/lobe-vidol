import { Form, FormGroup, FormItem } from '@lobehub/ui';
import { useRequest } from 'ahooks';
import { Form as AForm, Button, Input, Select, Tag, message } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { debounce, isEqual } from 'lodash-es';
import { HardDrive } from 'lucide-react';
import React, { useEffect } from 'react';

import { OPENAI_MODEL_LIST } from '@/constants/openai';
import { chatCompletion } from '@/services/chat';
import { configSelectors, useConfigStore } from '@/store/config';
import { ChatMessage } from '@/types/chat';
import { useTranslation } from 'react-i18next';

interface ConfigProps {
  className?: string;
  style?: React.CSSProperties;
}

const useStyles = createStyles(({ css }) => ({
  config: css`
    display: flex;
    flex-grow: 1;
    justify-content: center;
  `,
}));

const Config = (props: ConfigProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [form] = AForm.useForm();
  const serverConfig = useConfigStore((s) => configSelectors.currentServerConfig(s), isEqual);
  const setServerConfig = useConfigStore((s) => s.setServerConfig);
  const { t } = useTranslation('setting');

  useEffect(() => {
    form.setFieldsValue(serverConfig);
  }, [serverConfig, form]);

  const { loading, run: checkConnect } = useRequest(chatCompletion, {
    manual: true,
    onSuccess: (res) => {
      if (!res.ok) {
        message.error(t('server.connectionFailed'));
        return;
      }
      message.success(t('server.checkPassed'));
    },
  });

  return (
    <div className={classNames(styles.config, className)} style={style}>
      <Form
        form={form}
        onValuesChange={debounce(setServerConfig, 100)}
        style={{ display: 'flex', flexGrow: 1 }}
      >
         <FormGroup icon={HardDrive} title={t('serverSettings')}>
          {/*<FormItem desc={t('openAI.chatGPTModel')} label={t('model')} name="model">*/}
          {/* <Select*/}
          {/*    options={OPENAI_MODEL_LIST.map((model) => ({*/}
          {/*      label: (*/}
          {/*        <>*/}
          {/*          {model.name} <Tag color="green">{model.maxToken}</Tag>*/}
          {/*        </>*/}
          {/*      ),*/}
          {/*      value: model.name,*/}
          {/*    }))}*/}
          {/*    style={{ width: 300 }}*/}
          {/*  />*/}
          {/*</FormItem>*/}
          <FormItem desc={t('server.bearerTokenDescription')} divider label={t('server.bearerToken')} name="token">
            <Input.Password placeholder="Bearer ********" style={{ width: 480 }} />
          </FormItem>
          <FormItem desc={'http(s)://'} divider label={t('server.backendUrl')} name="endpoint">
            <Input placeholder="http(s)://backend.example/" style={{ width: 360 }} />
          </FormItem>
          <FormItem desc={t('server.checkTokenAndServerUrl')} divider label={t('server.connectivityCheck')}>
            <Button
              loading={loading}
              onClick={() =>
                checkConnect({
                  messages: [
                    {
                      content: 'Hi',
                      role: 'user',
                    } as ChatMessage,
                  ],
                  model: 'gpt-3.5-turbo',
                })
              }
            >
              {t('server.check')}
            </Button>
          </FormItem>
        </FormGroup>
      </Form>
    </div>
  );
};

export default Config;
