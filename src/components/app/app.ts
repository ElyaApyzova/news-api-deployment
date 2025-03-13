import AppController from '../controller/controller';
import { AppView } from '../view/appView';

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

enum EventType {
    Click = 'click',
}

type NewsCallback = (data: NewsResponse) => void;
type SourcesCallback = (data: SourcesResponse) => void;

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesElement = document.querySelector('.sources');
        if (sourcesElement) {
            sourcesElement.addEventListener(EventType.Click, (e: Event) => {
                const newsCallback: NewsCallback = this.view.drawNews;
                this.controller.getNews(e, newsCallback);
            });
        }

        const sourcesCallback: SourcesCallback = this.view.drawSources;
        this.controller.getSources(sourcesCallback);
    }
}

export default App;
