import { Mode } from '@/constants/store';

export interface IDialogModeElement {
    mode?: Mode.FORM | Mode.ALERT | Mode.INFO,
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
    CHECK_MEMBERS: IDialogModeElement,
    LOGOUT: IDialogModeElement,
    EXIT: {},
}
