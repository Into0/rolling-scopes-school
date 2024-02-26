import './sources.css';
import { Source } from '../../../types/index';

class Sources {
  draw(data: Source[]): void {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp');

    if (!sourceItemTemp || !(sourceItemTemp instanceof HTMLTemplateElement)) {
      throw new Error('Template element not found or is not an HTMLTemplateElement');
    }

    data.forEach((item): void => {
      const sourceClone = sourceItemTemp.content.cloneNode(true);

      const tempElement = document.createElement('div');
      tempElement.appendChild(sourceClone);

      const sourcesItemNameElement = tempElement.querySelector('.source__item-name');
      if (sourcesItemNameElement instanceof HTMLElement) sourcesItemNameElement.textContent = item.name;

      const sourcesItemElement = tempElement.querySelector('.source__item');
      if (sourcesItemElement instanceof HTMLElement) sourcesItemElement.setAttribute('data-source-id', item.id);

      fragment.append(tempElement);
    });

    const sources = document.querySelector('.sources');
    if (sources instanceof HTMLElement) sources.append(fragment);
  }
}

export default Sources;
