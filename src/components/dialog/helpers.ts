import { IChat, IMemberInfo } from '@/redux/store/chat/types';

export function checkShowCloseIcon(
  selectedChat: IChat,
  member: IMemberInfo,
  selectedUserId: number,
): boolean {
  return selectedChat.userOwnerId !== member.id
      && selectedChat.userOwnerId === selectedUserId;
}
