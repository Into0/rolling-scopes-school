import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsApi } from '../../types/index';

class App {
  private controller: AppController;
  private view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    document
      .querySelector('.sources')
      ?.addEventListener('click', (e) => this.controller.getNews(e, (data: NewsApi) => this.view.drawNews(data)));
    this.controller.getSources((data: NewsApi) => this.view.drawSources(data));
  }
}

export default App;
