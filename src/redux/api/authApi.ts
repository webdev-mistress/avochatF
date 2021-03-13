import { getResource, Method } from '@/helpers/api';
import { IRequestUserData } from '@/types/store/userActions';
import { ICreateUserSaga, IGetUserSaga, ILogoutUserSaga } from '@/types/sagas';

const PREFIX_AUTH = '/api/v0/auth';

export const signInUser = function(user: IRequestUserData): Promise<IGetUserSaga> {
  return getResource({
    url: `${PREFIX_AUTH}/signIn?withChats=true`,
    method: Method.POST,
    body: user,
  });
};

export const signUpUser = function (
  email: string,
  name: string,
  login: string,
  password: string,
): Promise<ICreateUserSaga> {
  return getResource({
    url: `${PREFIX_AUTH}/signUp`,
    method: Method.POST,
    body: { email, name, login, password },
  });
};

export const confirmUser = function(token: string): Promise<any> {
  return getResource({
    url: `${PREFIX_AUTH}/confirm?token=${token}`,
    method: Method.GET,
  });
};

export const logoutUser = function(token: string): Promise<ILogoutUserSaga> {
  return getResource({
    url: `${PREFIX_AUTH}/logout?token=${token}`,
    method: Method.POST,
  });
};
