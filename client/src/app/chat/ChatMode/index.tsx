'use client';

import classNames from 'classnames';
import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import Alert from '@/features/Alert';
import MessageInput from '@/features/ChatInput/MessageInput';
import ChatList from '@/features/ChatList';

import { useStyles } from './style';

const Chat = () => {
  const { styles } = useStyles();
  const ref = React.useRef<HTMLDivElement>(null);
  // const background = useSessionStore((s) => sessionSelectors.currentAgent(s)?.meta?.cover);

  return (
    <Flexbox
      flex={1}
      className={styles.chat}
      // style={{ backgroundImage: `url(${background})` }}
    >
      <ChatList className={styles.list} />
      <Flexbox align={'center'} className={styles.docker} ref={ref}>
        <div className={classNames(styles.input)}>
          <MessageInput />
          <Alert style={{ marginTop: 8 }} />
        </div>
      </Flexbox>
    </Flexbox>
  );
};

export default memo(Chat);
