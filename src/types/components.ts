import React from 'react';
import { Mode } from '@/constants';

export interface IDialogModeElement {
    mode?: Mode.FORM | Mode.ALERT | Mode.INFO | Mode.USER_INFO,
    title?: string,
    label?: string,
    positiveBtnText?: string,
    positiveBtnFunc?: (arg: any) => any,
}

export interface IDialogMode {
    ADD_TO_CHAT: IDialogModeElement,
    DELETE_FROM_CHAT: IDialogModeElement,
    CREATE_CHAT: IDialogModeElement,
    DELETE_CHAT: IDialogModeElement,
    GET_CHAT_PARTICIPANTS: IDialogModeElement,
    USER_SETTINGS: IDialogModeElement,
    LOGOUT: IDialogModeElement,
    EXIT: {},
}

export type ListItemEvent = React.MouseEvent<HTMLLIElement>
    | React.MouseEvent<HTMLAnchorElement>
    | React.MouseEvent<HTMLDivElement>

export type ButtonEvent = React.MouseEvent<HTMLElement> | React.MouseEvent<HTMLButtonElement>
