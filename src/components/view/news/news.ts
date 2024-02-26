import './news.css';
import { Article } from '../../../types/index';

class News {
  draw(data: Article[]): void {
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

    const fragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector('#newsItemTemp');
    if (!newsItemTemp || !(newsItemTemp instanceof HTMLTemplateElement)) {
      throw new Error('Element with id "newsItemTemp" is not an HTMLTemplateElement');
    }

    news.forEach((item, idx) => {
      const newsClone = newsItemTemp.content.cloneNode(true);
      if (!(newsClone instanceof DocumentFragment)) {
        throw new Error('Cloned node is not a DocumentFragment');
      }

      const newsItemElement = newsClone.querySelector('.news__item');
      if (!newsItemElement) {
        throw new Error('Element with class "news__item" not found in template');
      }
      if (idx % 2) newsItemElement.classList.add('alt');

      const newsMetaPhotoElement = newsClone.querySelector('.news__meta-photo');
      if (!newsMetaPhotoElement || !(newsMetaPhotoElement instanceof HTMLElement)) {
        throw new Error('Element with class "news__meta-photo" not found in template');
      }
      newsMetaPhotoElement.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

      const newsMetaAuthorElement = newsClone.querySelector('.news__meta-author');
      if (!newsMetaAuthorElement) {
        throw new Error('Element with class "news__meta-author" not found in template');
      }
      newsMetaAuthorElement.textContent = item.author || item.source.name;

      const newsMetaDateElement = newsClone.querySelector('.news__meta-date');
      if (!newsMetaDateElement) {
        throw new Error('Element with class "news__meta-date" not found in template');
      }
      newsMetaDateElement.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

      const newsDescriptionTitleElement = newsClone.querySelector('.news__description-title');
      if (!newsDescriptionTitleElement) {
        throw new Error('Element with class "news__description-title" not found in template');
      }
      newsDescriptionTitleElement.textContent = item.title;

      const newsDescriptionSourceElement = newsClone.querySelector('.news__description-source');
      if (!newsDescriptionSourceElement) {
        throw new Error('Element with class "news__description-source" not found in template');
      }
      newsDescriptionSourceElement.textContent = item.source.name;

      const newsDescriptionContentElement = newsClone.querySelector('.news__description-content');
      if (!newsDescriptionContentElement) {
        throw new Error('Element with class "news__description-content" not found in template');
      }
      newsDescriptionContentElement.textContent = item.description;

      const newsReadMoreLinkElement = newsClone.querySelector('.news__read-more a');
      if (!newsReadMoreLinkElement || !(newsReadMoreLinkElement instanceof HTMLAnchorElement)) {
        throw new Error('Element with class "news__read-more a" not found in template');
      }
      newsReadMoreLinkElement.href = item.url;

      fragment.append(newsClone);
    });

    const newsElement = document.querySelector('.news');
    if (!newsElement || !(newsElement instanceof HTMLElement)) {
      throw new Error('Element with class "news" not found');
    }
    newsElement.innerHTML = '';
    newsElement.appendChild(fragment);
  }
}

export default News;
