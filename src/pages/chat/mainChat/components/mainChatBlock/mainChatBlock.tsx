import React from 'react';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import { EmptyChat } from '@/pages/chat/mainChat/components/emptyChat/emptyChat';
import { MessageList } from '@/pages/chat/mainChat/components/messageList/messageList';
import styles from '../../styles.module.scss';
import { useMainChatBlock } from '@/pages/chat/mainChat/components/mainChatBlock/hook';
import { ButtonWithLoader } from '@/components/ui/buttonWithLoader';

export const MainChat: React.FunctionComponent = () => {
  const {
    activeChatId,
    activeChatName,
    messageScroll,
    hasMessages,
    state,
    setState,
    messages,
    userId,
    anchorEl,
    setAnchorEl,
    onChangeMessage,
    onPressEvent,
    onSendMessage,
    isSendMessageLoading,
  } = useMainChatBlock();

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBlock}>
        <div className={styles.title}>
          {activeChatId ? `Active chat: ${activeChatName}` : 'Choose a chat'}
        </div>
      </div>
      {activeChatId && (
        <>
          <div ref={messageScroll} className={styles.messageWrapper}>
            {hasMessages
              ? (
                <MessageList
                  state={state}
                  setState={setState}
                  messages={messages}
                  userId={userId}
                  anchorEl={anchorEl}
                  setAnchorEl={setAnchorEl}
                />)
              : <EmptyChat />}
          </div>
          <div className={styles.form}>
            <TextField
              autoFocus
              id="standard-basic"
              color="primary"
              label="Enter Your Message"
              onChange={onChangeMessage}
              onKeyUp={onPressEvent}
              value={state.messageText}
            />
            <ButtonWithLoader
              variant="contained"
              color="primary"
              text={(<SendIcon />)}
              loaderSize={20}
              isLoading={isSendMessageLoading}
              onClick={onSendMessage}
              disabled={!state.messageText}
            />
          </div>
        </>
      )}
    </div>
  );
};
