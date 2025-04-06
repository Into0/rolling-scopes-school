import Api from "../api/api";
import Component from "./components";
import Tag from "./tags";

class CarComponent extends Component {
  private readonly CarContent: Component;
  private readonly CarRace: Component;
  constructor(name?: string, color?: string, id?: number, count?: number) {
    super({ className: 'car' })
    this.setAttribute('data-id', id);

    this.CarContent = Tag.div(
      'car-title',
      Tag.button('car-select', 'select', (event) => {
        const carId = event.target.parentNode.parentNode;
        console.log(carId);
      }),
      Tag.button('car-remove', 'remove', () => {
        this.removeCar();
      }),
      Tag.h4('car-name', name)
    )

    this.CarRace = Tag.div(
      'car-race',
      Tag.button('car-start', 'start', () => {}),
      Tag.button('car-stop', 'stop', () => {}),
    )

    this.appendChildren([this.CarContent, this.CarRace]);
  }

  private selectCar(): void {

  }

  private removeCar(): void {
    super.destroy();
  }

  private startCar(): void {

  }

  private stopCar(): void {

  }

}

export const Car = (name, color, id) => new CarComponent(name, color, id).getNode();