import './news.css';

interface Article {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    author: string;
    source: {
        name: string;
    };
}

class News {
    public draw(data: Article[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        if (newsItemTemp) {
            news.forEach((item: Article, idx: number) => {
                const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

                if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

                const metaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement;
                metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

                const metaAuthor = newsClone.querySelector('.news__meta-author') as HTMLElement;
                metaAuthor.textContent = item.author || item.source.name;

                const metaDate = newsClone.querySelector('.news__meta-date') as HTMLElement;
                metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

                const descriptionTitle = newsClone.querySelector('.news__description-title') as HTMLElement;
                descriptionTitle.textContent = item.title;

                const descriptionSource = newsClone.querySelector('.news__description-source') as HTMLElement;
                descriptionSource.textContent = item.source.name;

                const descriptionContent = newsClone.querySelector('.news__description-content') as HTMLElement;
                descriptionContent.textContent = item.description;

                const readMoreLink = newsClone.querySelector('.news__read-more a') as HTMLAnchorElement;
                readMoreLink.setAttribute('href', item.url);

                fragment.append(newsClone);
            });

            const newsContainer = document.querySelector('.news') as HTMLElement;
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;
