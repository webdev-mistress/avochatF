import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { MenuMessage } from '@/pages/chat/mainChat/components/menuMessage/menuMessage';
import { EditIcon } from '@/pages/chat/mainChat/components/editIcon';
import { IState } from '@/pages/chat/mainChat';
import { OptionIcons } from '@/pages/chat/mainChat/components/optionIcons';
import {
  useSettingsMessage,
} from '@/pages/chat/mainChat/components/settingsMessage/hook';
import { IMessage } from '@/types/store/chatActions';
import styles from '../../styles.module.scss';

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

export const SettingsMessage: React.FunctionComponent<IProps> = ({
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
  const { onOpenMenu } = useSettingsMessage({ state, setState, setAnchorEl });

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
        <MenuMessage
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
