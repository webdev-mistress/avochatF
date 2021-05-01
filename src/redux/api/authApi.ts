import { getResource, Method } from '@/helpers/api';
import {
  IChangePasswordData,
  ISignInUserData,
  IUserProfileDataWithChats,
} from '@/redux/store/user/types';
// import {
//   IChangePasswordSaga,
//   ILogoutUserSaga,
//   ISignInUserSaga,
//   ISignUpUserSaga,
// } from '@/utils/sagas';

const PREFIX_AUTH = '/api/v0/auth';

export const signInUser = function(
  user: ISignInUserData): Promise<IUserProfileDataWithChats> {
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
): Promise<ISignInUserData> {
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

export const logoutUser = function(token: string): Promise<any> {
  return getResource({
    url: `${PREFIX_AUTH}/logout?token=${token}`,
    method: Method.POST,
  });
};

export const changePassword = function(
  passwordData: IChangePasswordData): Promise<any> {
  return getResource({
    url: `${PREFIX_AUTH}/changePassword`,
    method: Method.POST,
    body: passwordData,
  });
};
