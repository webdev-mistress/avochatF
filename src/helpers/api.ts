import { accessToken } from '@/helpers/localStorage';

const devMode = process.env.NODE_ENV === 'development';
const baseUrl = devMode ? 'http://localhost:1213' : 'http://194.58.98.17:1213';

export enum Method {
  POST = 'POST',
  GET = 'GET',
}

interface IRequest {
  url: string,
  body?: any,
  method: Method,
}

export const getResource = async (request: IRequest): Promise<any> => {
  const {
    url,
    body,
    method,
  } = request;
  const init: any = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken.get()}`,
    },
    method,
  };

  if (body) {
    init.body = JSON.stringify(body);
  }
  const response = await fetch(`${baseUrl}${url}`, init);

  if (!response.ok) {
    throw response.status;
  }

  return response.json();
};
