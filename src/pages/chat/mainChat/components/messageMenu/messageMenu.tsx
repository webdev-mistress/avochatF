import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
  useMessageMenu,
} from '@/pages/chat/mainChat/components/messageMenu/hook';
import styles from '../../styles.module.scss';
import { IState } from '@/pages/chat/mainChat/components/mainChatBlock/hook';

interface IProps {
  anchorEl: Element | null,
  setAnchorEl: (anchorEl: Element | null) => void,
  state: IState,
  setState: (state: IState) => void,
}

export const MessageMenu: React.FunctionComponent<IProps> = ({
  anchorEl,
  setAnchorEl,
  state,
  setState,
}) => {
  const {
    onEditMode,
    onDeleteMessage,
  } = useMessageMenu({ setAnchorEl, state, setState });

  return (
    <>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
      >
        <MenuItem
          onClick={onEditMode}
          className={styles.icons}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={onDeleteMessage}
          className={styles.icons}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};
