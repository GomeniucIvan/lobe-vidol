import { Upload } from 'antd';
import { createStyles } from 'antd-style';
import NextImage from 'next/image';
import React, { CSSProperties, memo, useCallback } from 'react';

import {
  AVATAR_COMPRESS_SIZE,
  AVATAR_IMAGE_SIZE,
  DEFAULT_AGENT_AVATAR_URL,
} from '@/constants/common';
import { agentSelectors, useAgentStore } from '@/store/agent';
import { createUploadImageHandler } from '@/utils/common';
import { imageToBase64 } from '@/utils/imageToBase64';

const useStyle = createStyles(
  ({ css, token }) => css`
    cursor: pointer;
    overflow: hidden;
    border-radius: 50%;
    transition:
      scale 400ms ${token.motionEaseOut},
      box-shadow 100ms ${token.motionEaseOut};

    &:hover {
      box-shadow: 0 0 0 3px ${token.colorText};
    }

    &:active {
      scale: 0.8;
    }
  `,
);

interface AvatarWithUploadProps {
  compressSize?: number;
  id?: string;
  size?: number;
  style?: CSSProperties;
}

const AvatarWithUpload = memo<AvatarWithUploadProps>(
  ({ size = AVATAR_IMAGE_SIZE, compressSize = AVATAR_COMPRESS_SIZE, style, id }) => {
    const { styles } = useStyle();
    const [meta, updateAgentMeta] = useAgentStore((s) => [
      agentSelectors.currentAgentMeta(s),
      s.updateAgentMeta,
    ]);

    const handleUploadAvatar = useCallback(
      createUploadImageHandler((avatar) => {
        const img = new Image();
        img.src = avatar;
        img.addEventListener('load', () => {
          const webpBase64 = imageToBase64({ img, size: compressSize });
          updateAgentMeta({ avatar: webpBase64 });
        });
      }),
      [],
    );

    return (
      <div className={styles} id={id} style={{ maxHeight: size, maxWidth: size, ...style }}>
        <Upload beforeUpload={handleUploadAvatar} itemRender={() => void 0} maxCount={1}>
          <NextImage
            alt={meta?.avatar ? 'userAvatar' : 'LobeVidol'}
            height={size}
            src={!!meta?.avatar ? meta?.avatar : DEFAULT_AGENT_AVATAR_URL}
            unoptimized
            width={size}
          />
        </Upload>
      </div>
    );
  },
);

export default AvatarWithUpload;
