import Api from '../api/api';
import Page from './page';
import { Car } from '../components/car';
import { Controls, addCar, editCar } from '../components/controls';
import Tag from '../components/tags';
import { Modal } from '../components/modal';

class Garage extends Page {

  carList = Tag.div('car-list').getNode();
  public render(): HTMLElement {
    const garage = Tag.div('car-list');
    this.pageTitle.textContent = 'garage';
    this.updateTotalCars(this.pageTitle);

    Api.getCars().then((cars) => {
      cars.forEach(element => {
        this.carList.appendChild(Car(element.name, element.color, element.id))
      });
    })

    this.container.append(Modal().getNode(),this.pageSwitch, addCar(this.carList), editCar('', ''), this.pageTitle, this.carList);
    return this.container;
  }

  async updateTotalCars(elem): Promise<void>  {
    await Api.getCars();
    elem.textContent = `garage (${Api.totalCars})`;
  }

  private selectCar(): void {}

  private updateCar(): void {}
}

export default Garage;
