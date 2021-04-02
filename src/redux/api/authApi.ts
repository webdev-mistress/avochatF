import { getResource, Method } from '@/helpers/api';
import { IChangePasswordData, ISignInUserData } from '@/redux/store/user/types';
import {
  IChangePasswordSaga,
  ILogoutUserSaga,
  ISignInUserSaga,
  ISignUpUserSaga,
} from '@/types/sagas';
// import { ISignInUserData } from '@/types/store/userActions';
// import { IChangePasswordData } from '@/types/store/authActions';

const PREFIX_AUTH = '/api/v0/auth';

export const signInUser = function(user: ISignInUserData): Promise<ISignInUserSaga> {
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
): Promise<ISignUpUserSaga> {
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

export const changePassword = function(
  passwordData: IChangePasswordData): Promise<IChangePasswordSaga> {
  return getResource({
    url: `${PREFIX_AUTH}/changePassword`,
    method: Method.POST,
    body: passwordData,
  });
};
