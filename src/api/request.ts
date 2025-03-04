import { RequestClient } from "./requestClient/requestClient";

const apiURL = 'http://127.0.0.1:5000/api'

function createRequestClient(baseURL: string) {
    const client = new RequestClient({
      baseURL
    });

    return client;
}

export const requestClient = createRequestClient(apiURL);
