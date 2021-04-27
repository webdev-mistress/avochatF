import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IMessage } from '@/redux/store/chat/types';
import { MessageMenu } from '@/pages/chat/mainChat/components/messageMenu/messageMenu';
import { EditIcon } from '@/pages/chat/mainChat/components/messageIcons/editIcon';
import { OptionIcons } from '@/pages/chat/mainChat/components/messageIcons/optionIcons';
import {
  useMessageSettingsIconsBlock,
} from '@/pages/chat/mainChat/components/messageSettingsIconsBlock/hook';
import styles from '../../styles.module.scss';
import { IState } from '@/pages/chat/mainChat/components/mainChatBlock/hook';

interface IProps {
  isEditMessage: boolean,
  anchorEl: Element | null,
  setAnchorEl: (anchorEl: Element | null) => void,
  state: IState,
  setState: (state: IState) => void,
  message: IMessage,
  messageDateChange: string,
  onEditClose: () => void,
  onSendEditMessage: (content: string) => void,
}

export const MessageSettingsIconsBlock: React.FunctionComponent<IProps> = ({
  isEditMessage,
  anchorEl,
  setAnchorEl,
  state,
  setState,
  message,
  messageDateChange,
  onEditClose,
  onSendEditMessage,
}) => {
  const {
    onOpenMenu,
  } = useMessageSettingsIconsBlock({ state, setState, setAnchorEl });

  if (isEditMessage) {
    return (
      <OptionIcons
        state={state}
        message={message}
        onEditClose={onEditClose}
        onSendEditMessage={onSendEditMessage}
      />
    );
  }

  return (
    <>
      <MoreVertIcon
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={onOpenMenu(message)}
        className={styles.icons}
      />
      <div>
        <MessageMenu
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          state={state}
          setState={setState}
        />
        {message.dateChange && <EditIcon messageDateChange={messageDateChange} />}
      </div>
    </>
  );
};
