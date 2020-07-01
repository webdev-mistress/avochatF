const createHeader = (body) => ({
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
});

const devMode = process.env.devMode === 'production' || false;
const baseUrl = devMode ? 'http://localhost:4000' : 'http://80.87.201.216:4000';

export const getResource = async (url, body) => {
    const response = await fetch(`${baseUrl}${url}`, body && createHeader(body));

    if (!response.ok) {
        throw response.status;
    }

    return response.json();
};

