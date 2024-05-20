import { Form, FormItem } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React from 'react';

import { COVER_COMPRESS_HEIGHT, COVER_COMPRESS_WIDTH } from '@/constants/common';
import { INPUT_WIDTH_L, INPUT_WIDTH_M } from '@/constants/token';
import CoverWithUpload from '@/panels/RolePanel/RoleEdit/Info/CoverWithUpload';
import Greeting from '@/panels/RolePanel/RoleEdit/Info/Greeting';
import ReadMe from '@/panels/RolePanel/RoleEdit/Info/ReadMe';
import RoleDescription from '@/panels/RolePanel/RoleEdit/Info/RoleDescription';
import RoleName from '@/panels/RolePanel/RoleEdit/Info/RoleName';

import AvatarWithUpload from './AvatarWithUpload';
import {useTranslation} from "react-i18next";

interface InfoProps {
  className?: string;
  style?: React.CSSProperties;
}

const useStyles = createStyles(({ css, token }) => ({
  config: css`
    flex: 2;
    padding: 12px;
    border-radius: ${token.borderRadius}px;
  `,
  container: css`
    display: flex;
    flex-direction: column;
  `,
  form: css`
    display: flex;
  `,
  more: css`
    flex: 1;
    padding: 12px;
  `,
  cover: css`
    padding: 16px 0;
  `,
  name: css``,
  description: css`
    font-size: 12px;
    color: ${token.colorTextDescription};
  `,
}));

const Info = (props: InfoProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [form] = Form.useForm();
  const { t } = useTranslation('role');

  return (
    <Form form={form} layout="horizontal" requiredMark={false}>
      <div className={classNames(className, styles.container)} style={style}>
        <div className={styles.form}>
          <div className={styles.config}>
            <FormItem desc={t('info.avatarDescription')} label={t('info.avatar')} name={'avatar'}>
              <AvatarWithUpload />
            </FormItem>
            <FormItem label={t('info.name')} desc={t('info.nameDescription')} divider name={['name']}>
              <RoleName style={{ width: INPUT_WIDTH_M }} />
            </FormItem>
            <FormItem label={t('info.call')} desc={t('info.callDescription')} name="greeting" divider>
              <Greeting style={{ width: INPUT_WIDTH_L }} />
            </FormItem>
            <FormItem
              label={t('info.description')}
              divider
              desc={t('info.descriptionDescription')}
              name={'description'}
            >
              <RoleDescription style={{ width: INPUT_WIDTH_L }} />
            </FormItem>
            <FormItem
              label={t('info.roleDescription')}
              name={'readme'}
              divider
              desc={t('info.roleDescriptionDescription')}
            >
              <ReadMe style={{ width: INPUT_WIDTH_L }} />
            </FormItem>
          </div>
          <div className={styles.more}>
            <FormItem
              label={t('info.cover')}
              name={'cover'}
              desc={t('info.coverDescription', { width: COVER_COMPRESS_WIDTH, height:  COVER_COMPRESS_HEIGHT})}
            />
            <CoverWithUpload />
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Info;
