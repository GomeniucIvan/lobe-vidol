import { ActionIconGroup } from '@lobehub/ui';
import { Grid3x3, LandPlot, Orbit, RotateCw, SwitchCamera } from 'lucide-react';
import React from 'react';

import { useViewerStore } from '@/store/viewer';

interface ToolBarProps {
  className?: string;
  style?: React.CSSProperties;
  viewerRef?: React.RefObject<HTMLDivElement>;
}

const ToolBar = (props: ToolBarProps) => {
  const { style, className, viewerRef } = props;
  const viewer = useViewerStore((s) => s.viewer);
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      viewerRef?.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const dropdownMenu = [
    {
      icon: SwitchCamera,
      key: 'cameraHelper',
      label: '镜头辅助',
    },
    {
      icon: Orbit,
      key: 'cameraControl',
      label: '镜头控制',
    },
    {
      icon: LandPlot,
      key: 'floor',
      label: '切换地板',
    },
  ];

  return (
    <ActionIconGroup
      className={className}
      direction="column"
      dropdownMenu={dropdownMenu}
      items={[
        {
          icon: RotateCw,
          key: 'resetCamera',
          label: '重置镜头',
        },
        // {
        //   icon: Expand,
        //   key: 'expand',
        //   label: '全屏',
        // },
        {
          icon: Grid3x3,
          key: 'grid',
          label: '网格',
        },
      ]}
      onActionClick={(action) => {
        switch (action.key) {
          case 'resetCamera': {
            viewer.resetCamera();

            break;
          }
          case 'expand': {
            toggleFullScreen();

            break;
          }
          case 'grid': {
            viewer.toggleGrid();

            break;
          }
          case 'cameraHelper': {
            viewer.toggleCameraHelper();

            break;
          }
          case 'cameraControl': {
            viewer.toggleCameraControls();

            break;
          }
          case 'floor': {
            viewer.toggleFloor();

            break;
          }
          // No default
        }
      }}
      style={style}
      type={'block'}
    />
  );
};

export default ToolBar;