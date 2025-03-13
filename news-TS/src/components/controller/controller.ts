import AppLoader from './appLoader';

interface Source {
    id: string;
    name: string;
}

interface Article {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    author: string;
    source: Source;
}

interface NewsResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}

interface SourcesResponse {
    status: string;
    sources: Source[];
}

enum Status {
    Ok = 'ok',
    Error = 'error',
}

type NewsCallback = (data: NewsResponse) => void;
type SourcesCallback = (data: SourcesResponse) => void;

class AppController {
    private loader: AppLoader<NewsResponse | SourcesResponse>;

    constructor() {
        this.loader = new AppLoader<NewsResponse | SourcesResponse>();
    }

    public getSources(callback: SourcesCallback) {
        this.loader.getResp(
            {
                endpoint: 'sources',
            },
            (data: NewsResponse | SourcesResponse) => {
                if ('sources' in data && data.status === Status.Ok) {
                    callback(data);
                } else {
                    console.error('Unexpected response type:', data);
                }
            }
        );
    }

    public getNews(e: Event, callback: NewsCallback) {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') || '';
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    this.loader.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        (data: NewsResponse | SourcesResponse) => {
                            if ('articles' in data && data.status === Status.Ok) {
                                callback(data);
                            } else {
                                console.error('Unexpected response type:', data);
                            }
                        }
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
