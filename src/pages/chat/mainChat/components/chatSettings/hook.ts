import format from 'date-fns/format';
import { IMessage } from '@/types/store';

interface IProps {
    message: IMessage,
}
export const useChatSettings = (props: IProps) => {
    const { message } = props;

    return message.dateChange
        ? format(new Date(message.dateChange), 'HH:mm:ss dd.MM.yyyy') : '';
};
