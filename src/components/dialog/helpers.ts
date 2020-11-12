import { IChat, IMembersData } from '@/types/store';

export function checkShowCloseIcon(selectedChat: IChat, member: IMembersData, selectedUserId: number) {
    return selectedChat.userOwnerId !== member.userId && selectedChat.userOwnerId === selectedUserId;
}
