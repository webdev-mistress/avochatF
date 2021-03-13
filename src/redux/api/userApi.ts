import { getResource, Method } from '@/helpers/api';
import { IEditUserSaga } from '@/types/sagas';

const PREFIX_USER = '/api/v0/user';

interface IChangedFields {
  userId: number,
  newName?: string,
  newLogin?: string,
  oldPassword?: string,
  newPassword1?: string,
  newPassword2?: string,
}

export const editUser = function(changedFields: IChangedFields): Promise<IEditUserSaga> {
  return getResource({
    url: `${PREFIX_USER}/edit`,
    method: Method.POST,
    body: changedFields,
  });
};

