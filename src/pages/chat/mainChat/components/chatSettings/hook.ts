import format from 'date-fns/format';
import { IMessage } from '@/types/store/chatActions';

interface IArgs {
  message: IMessage,
}

export const useChatSettings = (args: IArgs): any => {
  const { message } = args;

  return message.dateChange
    ? format(new Date(message.dateChange), 'HH:mm:ss dd.MM.yyyy') : '';
};
