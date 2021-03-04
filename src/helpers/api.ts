import { accessToken } from '@/helpers/localStorage';

const devMode = process.env.NODE_ENV === 'development';
const baseUrl = devMode ? 'http://localhost:1213' : 'http://80.87.201.216:4000';

export const getResource = async (url: string, body: any = null) => {
    const init: any = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken.get()}`,
        },
    };
    if (body) {
        init.method = 'POST';
        init.body = JSON.stringify(body);
    }
    const response = await fetch(`${baseUrl}${url}`, init);

    if (!response.ok) {
        throw response.status;
    }

    return response.json();
};
