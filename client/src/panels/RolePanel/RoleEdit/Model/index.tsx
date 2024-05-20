import { Form, FormItem } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React from 'react';

import ViewerWithUpload from '@/panels/RolePanel/RoleEdit/Model/ViewerWithUpload';

import Touch from './Touch';
import {useTranslation} from "react-i18next";

interface ModelProps {
  className?: string;
  style?: React.CSSProperties;
}

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    display: flex;
  `,
  left: css`
    flex: 2;
    margin-right: 12px;
    border-radius: ${token.borderRadius}px;
  `,

  right: css`
    flex: 1;

    max-height: 740px;
    padding: 12px;

    border: 1px solid ${token.colorBorder};
    border-radius: ${token.borderRadius}px;
  `,
}));

const Model = (props: ModelProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const { t } = useTranslation('role');

  return (
    <Form>
      <div className={classNames(className, styles.container)} style={style}>
        <div className={styles.left}>
          <Touch />
        </div>
        <div className={styles.right}>
          <FormItem label={t('3dModelSettings.preview')} name={'model'} desc={t('3dModelSettings.previewDescription')} />
          <ViewerWithUpload />
        </div>
      </div>
    </Form>
  );
};

export default Model;
