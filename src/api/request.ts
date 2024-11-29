import { RequestClient } from "./requestClient/requestClient";

const apiURL = 'http://192.168.1.134:5000/api'

function createRequestClient(baseURL: string) {
    const client = new RequestClient({
      baseURL
    });

    return client;
}

export const requestClient = createRequestClient(apiURL);
