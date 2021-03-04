import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { IState } from '@/pages/chat/mainChat';
import { useMenuMessage } from '@/pages/chat/mainChat/components/menuMessage/hook';
import styles from '../../styles.module.scss';

interface IProps {
    anchorEl: Element | null,
    setAnchorEl: (anchorEl: Element | null) => void,
    state: IState,
    setState: (state: IState) => void,
}

export const MenuMessage = (props: IProps) => {
    const { anchorEl, setAnchorEl, state, setState } = props;
    const {
        onCloseMenu,
        onEditMode,
        onDeleteMessage,
    } = useMenuMessage({ setAnchorEl, state, setState });

    return (
        <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={!!anchorEl}
            onClick={onCloseMenu}
        >
            <MenuItem
                onClick={() => onEditMode()}
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
    );
};
