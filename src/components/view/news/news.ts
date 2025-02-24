import { NewsApi } from '../../../types/index';
import './news.css';

class News {
    draw(data: NewsApi['articles']): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp');

        const newsElement = document.querySelector('.news');

        if (!newsItemTemp || !(newsItemTemp instanceof HTMLTemplateElement)) {
            throw new Error('Template element not found');
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true);

            if (!(newsClone instanceof DocumentFragment)) {
                throw new Error('Cloned node is not a DocumentFragment');
            }
            const newsItemElement = newsClone.querySelector('.news__item');
            const newsMetaPhotoElement = newsClone.querySelector('.news__meta-photo');
            const newsMetaAuthorElement = newsClone.querySelector('.news__meta-author');
            const newsMetaDateElement = newsClone.querySelector('.news__meta-date');
            const newsDescriptionTitleElement = newsClone.querySelector('.news__description-title');
            const newsDescriptionSourceElement = newsClone.querySelector('.news__description-source');
            const newsDescriptionContentElement = newsClone.querySelector('.news__description-content');
            const newsReadMoreLinkElement = newsClone.querySelector('.news__read-more a');

            if (
                !newsItemElement ||
                !(newsMetaPhotoElement instanceof HTMLDivElement) ||
                !newsMetaAuthorElement ||
                !newsMetaDateElement ||
                !newsDescriptionContentElement ||
                !newsReadMoreLinkElement ||
                !newsDescriptionTitleElement ||
                !newsDescriptionSourceElement
            ) {
                throw new Error('Element not found in template');
            }

            if (idx % 2) newsItemElement.classList.add('alt');

            newsMetaPhotoElement.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            newsMetaAuthorElement.textContent = item.author || item.source.name;
            newsMetaDateElement.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            newsDescriptionTitleElement.textContent = item.title;
            newsDescriptionSourceElement.textContent = item.source.name;
            newsDescriptionContentElement.textContent = item.description;
            newsReadMoreLinkElement.setAttribute('href', item.url);

            fragment.append(newsClone);
        });
        if (!newsElement) {
            throw new Error('Element newsElement not found');
        }
        newsElement.innerHTML = '';
        newsElement.appendChild(fragment);
    }
}

export default News;
