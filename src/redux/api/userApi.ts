import { getResource, Method } from '@/helpers/api';
import { IChangeUserData } from '@/redux/store/user/types';
// import { IEditUserSaga } from '@/utils/sagas';

const PREFIX_USER = '/api/v0/user';

export const editUser = function(changedFields: IChangeUserData): Promise<any> {
  return getResource({
    url: `${PREFIX_USER}/edit`,
    method: Method.POST,
    body: changedFields,
  });
};

