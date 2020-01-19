const createHeader = (body) => ({
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
});

const url = 'http://80.87.201.216:3000/loto';

export const getLoto = async () => {
    const response = await fetch(url);

    return response.json();
};

export const updateLoto = async (num, countUsed) => {
    const response = await fetch(`${url}/update`, createHeader({ num, countUsed }));

    return response.json();
};

export const zeroizeLoto = async () => {
    const response = await fetch(`${url}/zeroize`, createHeader({ }));

    return response.json();
};
