type RespCallback<T> = (data: T) => void;

enum HttpMethod {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Delete = 'DELETE',
}

class Loader<T> {
    private baseLink: string;
    private options: { apiKey: string; [key: string]: string };

    constructor(baseLink: string, options: { apiKey: string; [key: string]: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint, options = {} }: { endpoint: string; options?: { [key: string]: string } },
        callback: RespCallback<T> = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load(HttpMethod.Get, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: { [key: string]: string }, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(
        method: HttpMethod,
        endpoint: string,
        callback: RespCallback<T>,
        options: { [key: string]: string } = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data as T))
            .catch((err) => console.error(err));
    }
}

export default Loader;