import './sources.css';
import { NewsItem } from '../../../types/index';

class Sources {
  draw(data: NewsItem[]): void {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

      const sourcesItemNameElement = sourceClone.querySelector('.source__item-name') as HTMLElement;
      sourcesItemNameElement.textContent = item.name;

      const sourcesItemElement = sourceClone.querySelector('.source__item') as HTMLElement;
      sourcesItemElement.setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    const sources = document.querySelector('.sources') as HTMLElement;
    sources.append(fragment);
  }
}

export default Sources;
