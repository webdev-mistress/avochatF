export const localStorageTypes = {
  token: 'ledev:access_token',
};

export const accessToken = {
  get(): any {
    return localStorage.getItem(localStorageTypes.token) || '';
  },
  set(token: string): any {
    localStorage.setItem(localStorageTypes.token, token);
  },
  remove(): any {
    localStorage.removeItem(localStorageTypes.token);
  },
};
