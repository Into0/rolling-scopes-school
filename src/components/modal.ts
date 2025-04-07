import Component from './components';
import Tag from './tags';

class ModalComponent extends Component {
  private readonly modalContent: Component;

  private readonly modalWrapper: Component;

  constructor() {
    super({ className: 'modal' });
    this.modalWrapper = Tag.div('moda-wrapper');
    this.modalContent = Tag.div('modal-content', 
    Tag.h2('title', 'Привет, можешь пожалуйста проверить ближе к дедлайну 10.04.2025, Спасибо :)')
    );

    this.appendChildren([this.modalContent, this.modalWrapper]);
    this.show();
  }

  show() {
    this.toggleClass('modal-show');
  }
}

export const Modal = () => new ModalComponent();