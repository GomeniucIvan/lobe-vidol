'use client';

import { Grid, SpotlightCardProps } from '@lobehub/ui';
import {Button, Card, Empty, Progress, Skeleton} from 'antd';
import { createStyles } from 'antd-style';
import isEqual from 'fast-deep-equal';
import React, { memo, useCallback, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LazyLoad from 'react-lazy-load';

import {useHubStore} from "@/store/hub";
import {hubSelectors} from "@/store/hub/selectors";
import {cancelDownload, downloadFile, DownloadItem} from "@/services/download";
import ModelItem from "@/app/hub/features/ModelItem";

const useStyles = createStyles(({ css, responsive }) => ({
  compactLazy: css`
    min-height: 120px;
  `,
  lazy: css`
    min-height: 332px;
  `,
  title: css`
    margin-top: 0.5em;
    font-size: 24px;
    font-weight: 600;
    ${responsive.mobile} {
      font-size: 20px;
    }
  `,
}));

export interface ModelListProps {
  mobile?: boolean;
}

const downloadItems: DownloadItem[] = [
  { id: 1, name: 'File 1', url: 'file1.zip', size: 5000000 },
  { id: 2, name: 'File 2', url: 'file2.zip', size: 3000000 },
  { id: 3, name: 'File 3', url: 'file3.zip', size: 10000000 },
];

const AgentList = memo<ModelListProps>(({ mobile }) => {
  const { t } = useTranslation('hub');
  const [searchKeywords, useFetchAgentList] = useHubStore((s) => [
    s.searchKeywords,
    s.useFetchModelList,
  ]);
  const { isLoading } = useFetchAgentList();
  const modelList = useHubStore(hubSelectors.getModelList, isEqual);
  const { styles } = useStyles();
  const recentLength = mobile ? 3 : 6;

  useLayoutEffect(() => {
    // refs: https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md#hashydrated
    useHubStore.persist.rehydrate();
  }, []);

  const GridCompactRender: SpotlightCardProps['renderItem'] = useCallback(
    (props: any) => (
      <LazyLoad className={styles.compactLazy} offset={332}>
        <ModelItem variant={'compact'} {...props} />

        {/*{modelList.map(item => (*/}
        {/*  <Card key={item.id} title={item.name} style={{ width: 300 }}>*/}
        {/*    <Progress percent={progress[item.id] ?? 0} />*/}
        {/*    <div>Downloaded MB: {(downloadedMB[item.id] ?? 0).toFixed(2)} MB</div>*/}
        {/*    <div>Total MB: {(item.size / (1024 * 1024)).toFixed(2)} MB</div>*/}
        {/*    <div>Remaining Time: {(remainingTime[item.id] ?? 0).toFixed(2)} seconds</div>*/}
        {/*    <Button onClick={() => downloadFile(item, updateProgress, updateDownloadedMB, updateRemainingTime, controllers)}>*/}
        {/*      Download*/}
        {/*    </Button>*/}
        {/*    <Button onClick={() => cancelDownload(item.id, controllers)} danger>*/}
        {/*      Cancel Download*/}
        {/*    </Button>*/}
        {/*  </Card>*/}
        {/*))}*/}

        {/*<AgentCard variant={'compact'} {...props} />*/}
      </LazyLoad>
    ),
    [],
  );

  if (isLoading || (!searchKeywords && modelList?.length === 0)) {
    return (
      <>
        <Skeleton paragraph={{ rows: 8 }} title={false} />
      </>
    );
  }

  if (searchKeywords) {
    if (modelList.length === 0) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    return (
      <Grid rows={3}>
        {modelList.map((item) => (
          <GridCompactRender key={item.identifier} {...item} />
        ))}
      </Grid>
    );
  }

  return (
    <>
      <h2 className={styles.title}>{t('title.downloadedModels')}</h2>
      <Grid rows={3}>
        {modelList.slice(0, recentLength).map((item) => (
          <ModelItem key={item.identifier} {...item} />
        ))}
      </Grid>
      <h2 className={styles.title}>{t('title.allModels')}</h2>
      <Grid rows={3}>
        {modelList.slice(recentLength).map((item) => (
          <GridCompactRender key={item.identifier} {...item} />
        ))}
      </Grid>
    </>
  );
});

AgentList.displayName = 'AgentList';

export default AgentList;
