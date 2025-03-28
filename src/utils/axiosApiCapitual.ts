import axios from 'axios';

const apiAxiosCapitual = axios.create({
  baseURL: 'https://trade.capstg.dev/api/v1.0/',
});

apiAxiosCapitual.interceptors.request.use((config) => {
  const client_id = process.env.CLIENT_ID_CAPITUAL;
  const client_secret = process.env.CLIENTE_SECRET_CAPITUAL;

  if (client_id && client_secret) {
    const credentials = `${client_id}:${client_secret}`;
    const encodedCredentials = Buffer.from(credentials).toString('base64');

    config.headers['Authorization'] = `Basic ${encodedCredentials}`;
  }

  return config;
});

apiAxiosCapitual.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    if (error.response) {
      const status = error.response.status;
      if (status >= 200 && status < 600) {
        return Promise.resolve(error.response);
      }
    }
    return Promise.reject(error);
  },
);

export default apiAxiosCapitual;
