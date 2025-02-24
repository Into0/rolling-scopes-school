import { NewsApi } from '../../../types/index';
import './sources.css';

class Sources {
    draw(data: NewsApi['sources']): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');

        if (!sourceItemTemp || !(sourceItemTemp instanceof HTMLTemplateElement)) {
            throw new Error('Template element not found');
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true);

            if (!(sourceClone instanceof DocumentFragment)) {
                throw new Error('Cloned node is not a DocumentFragment');
            }

            const sourcesItemNameElement = sourceClone.querySelector('.source__item-name');
            const sourcesItemElement = sourceClone.querySelector('.source__item');

            if (!sourcesItemNameElement || !sourcesItemElement) {
                throw new Error('Element not found in template');
            }

            sourcesItemNameElement.textContent = item.name;
            sourcesItemElement.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });
        const sources = document.querySelector('.sources');
        if (sources instanceof HTMLElement) sources.append(fragment);
    }
}

export default Sources;
