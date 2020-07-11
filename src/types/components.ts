export interface IDialogModeElement {
    form?: boolean,
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
    LOGOUT: IDialogModeElement,
    EXIT: {},
}
