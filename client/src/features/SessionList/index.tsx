import { SearchBar } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import { HEADER_HEIGHT } from '@/constants/token';
import Market from '@/features/Actions/Market';
import { useTranslation } from 'react-i18next';

import V from './Elsa';
import List from './List';

const useStyles = createStyles(({ css, token, prefixCls }) => ({
  list: css`
    padding: 8px;
  `,
  container: css`
    .${prefixCls}-collapse-header {
      padding-inline: 8px !important;
      color: ${token.colorTextDescription} !important;
      border-radius: ${token.borderRadius}px !important;

      &:hover {
        color: ${token.colorText} !important;
        background: ${token.colorFillTertiary};
        .${prefixCls}-collapse-extra {
          display: block;
        }
      }
    }
    .${prefixCls}-collapse-extra {
      display: none;
    }
    .${prefixCls}-collapse-content {
      border-radius: 0 !important;
    }
    .${prefixCls}-collapse-content-box {
      padding: 0 !important;
    }
  `,
  icon: css`
    transition: all 100ms ${token.motionEaseOut};
  `,
}));

const SideBar = () => {
  const { styles } = useStyles();
  const [searchName, setSearchName] = useState<string>();
  const { t } = useTranslation('common');

  return (
    <>
      <Flexbox
        justify={'space-between'}
        horizontal
        align={'center'}
        style={{ height: HEADER_HEIGHT, padding: '8px 8px 0' }}
      >
        <SearchBar
          enableShortKey
          onChange={(e) => {
            setSearchName(e.target.value);
          }}
          placeholder={t('search')}
          shortKey="f"
          spotlight
          type={'block'}
          value={searchName}
        />
        <Market />
      </Flexbox>
      <div className={styles.list}>
        <V />
        <List filter={searchName} />
      </div>
    </>
  );
};

export default SideBar;
