import { useCallback } from 'react';
import { DIALOG_MODE } from '@/pages/chat/leftChat/constants';
import { IDialogModeElement } from '@/types/components';

interface IArgs {
    setDialogMode: (dialogMode: IDialogModeElement) => void,
}

export const useDialog = (props: IArgs) => {
    const { setDialogMode } = props;

    const closeDialog = useCallback(() => {
        setDialogMode(DIALOG_MODE.EXIT);
    }, [setDialogMode]);

    return {
        closeDialog,
    };
};
