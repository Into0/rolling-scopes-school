import AppLoader from './appLoader';
import { CallbackFunction } from '../../types/index';

class AppController extends AppLoader {
  getSources<T>(callback: CallbackFunction<T>) {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback
    );
  }

  getNews<T>(e: Event, callback: CallbackFunction<T>) {
    let target = e.target;
    const newsContainer = e.currentTarget;

    if (!(target instanceof HTMLElement) || !(newsContainer instanceof HTMLElement)) return;

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');
        if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            callback
          );
        }
        return;
      }
      target = target.parentNode;
      if (!(target instanceof HTMLElement)) return;
    }
  }
}

export default AppController;
