export const localStorageTypes = {
    token: 'ledev:access_token',
};

export const accessToken = {
    get() {
        return localStorage.getItem(localStorageTypes.token) || '';
    },
    set(token: string) {
        localStorage.setItem(localStorageTypes.token, token);
    },
    remove() {
        localStorage.removeItem(localStorageTypes.token);
    },
};
