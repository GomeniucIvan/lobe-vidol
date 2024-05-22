import React from 'react';

export interface DownloadItem {
  id: number;
  name: string;
  url: string;
  size: number; // Size in bytes
}

export const downloadFile = async (
  item: DownloadItem,
  updateProgress: (id: number, progress: number) => void,
  updateDownloadedMB: (id: number, downloadedMB: number) => void,
  updateRemainingTime: (id: number, remainingTime: number) => void,
  controllers: React.MutableRefObject<{ [key: number]: AbortController }>
) => {
  const response = await fetch(`http://localhost:5000/api/download/start/${item.url}`);
  const data = await response.json();
  const { downloadId, totalSize } = data;

  controllers.current[item.id] = new AbortController();

  const startTime = new Date().getTime();
  const interval = setInterval(async () => {
    const statusResponse = await fetch(`http://localhost:5000/api/download/status/${downloadId}`);
    const statusData = await statusResponse.json();

    if (statusResponse.ok) {
      const { totalSize, downloadedSize, isCompleted } = statusData;
      updateProgress(item.id, (downloadedSize / totalSize) * 100);
      updateDownloadedMB(item.id, downloadedSize / (1024 * 1024));

      const elapsedTime = (new Date().getTime() - startTime) / 1000;
      const remainingTimeSeconds = (totalSize - downloadedSize) / (downloadedSize / elapsedTime);
      updateRemainingTime(item.id, remainingTimeSeconds);

      if (isCompleted) {
        clearInterval(interval);
        window.location.href = `http://localhost:5000/api/download/file/${downloadId}/${item.url}`;
      }
    }
  }, 1000);
};

export const cancelDownload = (id: number, controllers: React.MutableRefObject<{ [key: number]: AbortController }>) => {
  if (controllers.current[id]) {
    controllers.current[id].abort();
  }
};
