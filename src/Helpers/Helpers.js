export enum HttpMethod {
    POST = 'POST',
    PUT = 'PUT',
    GET = 'GET',
    DELETE = 'DELETE',
    PATCH = 'PATCH'
}

export interface ApiHelperOptions {
    url: string;
    method?: HttpMethod;
    data?: Record<string, any>;
    headers?: HeadersInit;
}

export async function ApiHelper({
    url,
    method = HttpMethod.POST,
    data = {},
    headers
}: ApiHelperOptions): Promise<any> {
    try {
        const response = await fetch(url, {
            method: method,
            withCredentials: true,
            body: method === HttpMethod.POST || method === HttpMethod.PUT ? JSON.stringify(data) : undefined,
            headers: headers,
            redirect: 'follow'
        });

        if (response.status === 401) {
            console.log('Move to Login');
        }

        return await response.json();
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        throw error;
    }
}
