import './news.css';

interface NewsItem {
  urlToImage: string;
  author: string;
  source: {
    name: string;
  };
  publishedAt: string;
  title: string;
  description: string;
  url: string;
}

class News {
  draw(data: NewsItem[]): void {
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

    const fragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

    news.forEach((item, idx) => {
      const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

      const newsItemElement = newsClone.querySelector('.news__item') as HTMLElement;

      if (idx % 2) newsItemElement.classList.add('alt');

      const newsMetaPhotoElement = newsClone.querySelector('.news__meta-photo') as HTMLElement;
      newsMetaPhotoElement.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

      const newsMetaAuthorElement = newsClone.querySelector('.news__meta-author') as HTMLElement;
      newsMetaAuthorElement.textContent = item.author || item.source.name;

      const newsMetaDateElement = newsClone.querySelector('.news__meta-date') as HTMLElement;
      newsMetaDateElement.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

      const newsDescriptionTitleElement = newsClone.querySelector('.news__description-title') as HTMLElement;
      newsDescriptionTitleElement.textContent = item.title;

      const newsDescriptionSourceElement = newsClone.querySelector('.news__description-source') as HTMLElement;
      newsDescriptionSourceElement.textContent = item.source.name;

      const newsDescriptionContentElement = newsClone.querySelector('.news__description-content') as HTMLElement;
      newsDescriptionContentElement.textContent = item.description;

      const newsReadMoreLinkElement = newsClone.querySelector('.news__read-more a') as HTMLAnchorElement;
      newsReadMoreLinkElement.href = item.url;

      fragment.append(newsClone);
    });

    const newsElement = document.querySelector('.news') as HTMLElement;
    newsElement.innerHTML = '';
    newsElement.appendChild(fragment);
  }
}

export default News;
