import { IChat, IMembersData } from '@/types/store/chatActions';

export function checkShowCloseIcon(
  selectedChat: IChat,
  member: IMembersData,
  selectedUserId: number,
): boolean {
  return selectedChat.userOwnerId !== member.id
      && selectedChat.userOwnerId === selectedUserId;
}
