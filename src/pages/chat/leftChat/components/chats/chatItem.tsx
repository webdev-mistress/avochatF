import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import cn from 'classnames';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styles from '@/pages/chat/leftChat/styles.module.scss';
import { IChat } from '@/types/store/chatActions';

interface IProps {
  chat: IChat,
  activeChatId: number,
  onLoadChat: (chat: IChat) => any,
  onOpenChatSettings: (chat: IChat) => any,
}

export const ChatItem: React.FunctionComponent<IProps> = ({
  chat,
  activeChatId,
  onLoadChat,
  onOpenChatSettings,
}) => {
  return (
    <ListItem
      className={cn(styles.chatItem, chat.id === activeChatId && styles.chatItemActive)}
      key={chat.id}
      onClick={onLoadChat(chat)}
    >
      <ListItemAvatar>
        <Avatar className={styles.avatar} alt={chat.name} src="/static/invalide.path" />
      </ListItemAvatar>
      <ListItemText
        className={styles.chatItemText}
        primary={chat.name}
        secondary={chat.lastMessage || 'Chat'}
      />
      <MoreVertIcon
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={onOpenChatSettings(chat)}
        className={styles.icons}
      />
    </ListItem>
  );
};
