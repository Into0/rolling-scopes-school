import Api from '../api/api';
import Page from './page';
import Ui from './ui';

class Garage extends Page {
  private carColor = '#000000';
  private carName = '';
  public render(): HTMLElement {
    this.pageTitle.textContent = 'garage';
    this.container.append(this.pageSwitch, this.pageTitle);
    this.getTotalCars();
    this.createCar();
    return this.container;
  }

  private async getTotalCars(): Promise<void> {
    await Api.getCars();
    this.pageTitle.textContent = `garage (${Api.totalCars})`;
  }

  private createCar(): void {
    this.container.append(
      Ui.createCar(
        (textInput) => {
          this.carName = (textInput.target as HTMLInputElement).value;
        },
        (colorInput) => {
          this.carColor = (colorInput.target as HTMLInputElement).value;
        },
        () => {
          Api.createCar({
            name: `${this.carName}`,
            color: `${this.carColor}`,
          });
          this.getTotalCars();
        },
      ).getNode(),
    );
  }

  private selectCar(): void {}

  private updateCar(): void {}
}

export default Garage;
