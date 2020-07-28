import React, { useCallback } from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { deleteMessage } from '@/redux/store/chat/actions';
import { IState } from '@/pages/chat/mainChat';
import styles from '../styles.module.scss';

interface IProps {
    anchorEl: Element | null,
    setAnchorEl: (anchorEl: Element | null) => void,
    state: IState,
    setState: (state: IState) => void,
}

export const MenuMessage = (props: IProps) => {
    const { anchorEl, setAnchorEl, state, setState } = props;
    const dispatch: Dispatch = useDispatch();

    const onCloseMenu = useCallback(() => {
        setAnchorEl(null);
    }, [setAnchorEl]);

    const onEditMode = useCallback(() => {
        onCloseMenu();

        setTimeout(() => {
            setState({
                ...state,
                isEditMode: true,
                messageEdit: _.get(state,'selectedMessage.message', ''),
            });
        }, 0);
    }, [onCloseMenu, setState, state]);

    const onDeleteMessage = () => {
        dispatch(deleteMessage(_.get(state, 'selectedMessage.messageId', 0)));
    };

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
