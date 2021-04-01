import { IChat, IMembersData } from '@/redux/store/chat/types';

export function checkShowCloseIcon(
  selectedChat: IChat,
  member: IMembersData,
  selectedUserId: number,
): boolean {
  return selectedChat.userOwnerId !== member.id
      && selectedChat.userOwnerId === selectedUserId;
}
