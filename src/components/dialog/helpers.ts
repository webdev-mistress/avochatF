import { IMemberInfo } from '@/redux/store/chat/types';

export function checkShowCloseIcon(
  selectedUserOwnerId: number | null,
  member: IMemberInfo,
  selectedUserId: number | null,
): boolean {
  return selectedUserOwnerId !== member.id
      && selectedUserOwnerId === selectedUserId;
}
