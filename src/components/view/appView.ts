import News from './news/news';
import Sources from './sources/sources';

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

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews: NewsCallback = (data) => {
        if (data.status === Status.Ok) {
            const values = data?.articles ? data.articles : [];
            this.news.draw(values);
        } else {
            console.error('Error fetching news:', data);
        }
    };

    public drawSources: SourcesCallback = (data) => {
        if (data.status === Status.Ok) {
            const values = data?.sources ? data.sources : [];
            this.sources.draw(values);
        } else {
            console.error('Error fetching sources:', data);
        }
    };
}

export default AppView;
