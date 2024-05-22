'use client';

import React, { useState, useRef } from 'react';
import { Card, Button, Progress } from 'antd';
import { Flexbox } from 'react-layout-kit';
import {cancelDownload, downloadFile, DownloadItem} from "@/services/download";
import ModelList from "@/app/hub/features/ModelList";

const downloadItems: DownloadItem[] = [
  { id: 1, name: 'File 1', url: 'file1.zip', size: 5000000 },
  { id: 2, name: 'File 2', url: 'file2.zip', size: 3000000 },
  { id: 3, name: 'File 3', url: 'file3.zip', size: 10000000 },
];

const Index: React.FC = () => {
  const [progress, setProgress] = useState<{ [key: number]: number }>({});
  const [downloadedMB, setDownloadedMB] = useState<{ [key: number]: number }>({});
  const [remainingTime, setRemainingTime] = useState<{ [key: number]: number }>({});
  const controllers = useRef<{ [key: number]: AbortController }>({});

  const updateProgress = (id: number, progress: number) => {
    setProgress(prev => ({ ...prev, [id]: progress }));
  };

  const updateDownloadedMB = (id: number, downloadedMB: number) => {
    setDownloadedMB(prev => ({ ...prev, [id]: downloadedMB }));
  };

  const updateRemainingTime = (id: number, remainingTime: number) => {
    setRemainingTime(prev => ({ ...prev, [id]: remainingTime }));
  };

  return (
    <Flexbox gap={16}>
      <ModelList />
    </Flexbox>
  );
};

export default Index;
