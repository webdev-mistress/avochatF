import { getResource, Method } from '@/helpers/api';
import { IEditUserSaga } from '@/types/sagas';
import { IChangeUserData } from '@/types/store/userActions';

const PREFIX_USER = '/api/v0/user';

export const editUser = function(changedFields: IChangeUserData): Promise<IEditUserSaga> {
  return getResource({
    url: `${PREFIX_USER}/edit`,
    method: Method.POST,
    body: changedFields,
  });
};

