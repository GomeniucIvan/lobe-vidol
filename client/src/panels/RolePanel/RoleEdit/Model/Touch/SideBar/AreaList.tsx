import { List } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';

import { useTouchStore } from '@/store/touch';
import { TouchAreaEnum } from '@/types/touch';
import {useTranslation} from "react-i18next";

const useStyles = createStyles(({ css, token }) => ({
  active: css`
    background-color: ${token.controlItemBgActiveHover};
  `,
  list: css`
    width: 240px;
    border-right: 1px solid ${token.colorBorder};
  `,
  listItem: css`
    &:hover {
      cursor: pointer;
    }
  `,
}));

const AreaList = () => {
  const { styles } = useStyles();
  const { currentTouchArea, setCurrentTouchArea } = useTouchStore();
  const { t } = useTranslation('role');

  const data = [
    { label: t('3dModelSettings.touchList.head'), value: TouchAreaEnum.Head },
    { label: t('3dModelSettings.touchList.arm'), value: TouchAreaEnum.Arm },
    { label: t('3dModelSettings.touchList.leg'), value: TouchAreaEnum.Leg },
    { label: t('3dModelSettings.touchList.chest'), value: TouchAreaEnum.Chest },
    { label: t('3dModelSettings.touchList.abdomen'), value: TouchAreaEnum.Belly },
  ];

  return (
    <List
      className={styles.list}
      dataSource={data}
      header={<div style={{ padding: 12 }}>{t('3dModelSettings.touchListName')}</div>}
      renderItem={(item) => (
        <List.Item
          className={classNames(styles.listItem, {
            [styles.active]: item.value === currentTouchArea,
          })}
          onClick={() => setCurrentTouchArea(item.value)}
          style={{ padding: 12 }}
        >
          {item.label}
        </List.Item>
      )}
    />
  );
};

export default AreaList;
