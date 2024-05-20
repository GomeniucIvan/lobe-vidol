import { Upload } from 'antd';
import localforage from 'localforage';
import React, { CSSProperties, memo } from 'react';

import EmptyGuide from '@/components/EmptyGuide';
import { ROLE_VIEWER_HEIGHT, ROLE_VIEWER_WIDTH } from '@/constants/common';
import AgentViewer from '@/features/AgentViewer';
import { agentSelectors, useAgentStore } from '@/store/agent';
import { generateModelKey } from '@/utils/model';
import {useTranslation} from "react-i18next";

interface ViewerWithUploadProps {
  style?: CSSProperties;
}

const ViewerWithUpload = memo<ViewerWithUploadProps>(({ style }) => {
  const { t } = useTranslation('role');

  const [currentAgentModel, updateAgentConfig] = useAgentStore((s) => [
    agentSelectors.currentAgentModel(s),
    s.updateAgentConfig,
  ]);

  const handleUploadAvatar = (file: any) => {
    const { name, size } = file;
    const blob = new Blob([file], { type: 'application/octet-stream' });
    const modelKey = generateModelKey(name, size);
    localforage.setItem(modelKey, blob).then(() => {
      updateAgentConfig({ meta: { model: modelKey } });
    });
  };

  return (
    <Upload
      beforeUpload={handleUploadAvatar}
      itemRender={() => void 0}
      accept={'.vrm'}
      maxCount={1}
      style={style}
      openFileDialogOnClick={!currentAgentModel}
    >
      {currentAgentModel ? (
        <AgentViewer
          height={ROLE_VIEWER_HEIGHT}
          modelUrl={currentAgentModel}
          width={ROLE_VIEWER_WIDTH}
        />
      ) : (
        <EmptyGuide
          size={{ height: ROLE_VIEWER_HEIGHT, width: ROLE_VIEWER_WIDTH }}
          extra={t('3dModelSettings.uploadFileDescription')}
        />
      )}
    </Upload>
  );
});

export default ViewerWithUpload;
