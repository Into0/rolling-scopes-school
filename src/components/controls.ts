import Api from "../api/api";
import Garage from "../pages/garage";
import { Car } from "./car";
import Component from "./components";
import Tag from "./tags";

class ControlsComponent extends Component {

  carName = 'Tesla';
  carColor = '#dcdcdc';
  carId = 1;

  private readonly addCar: Component;
  private readonly editCar: Component;

  constructor(parent, id?) {
    super({ className: 'controls' })

    this.addCar = Tag.div(
      'add-car',
      Tag.input('car-name-input', 'text', '', (event) => {
        this.carName = event.target.value;
      }),
      Tag.input('car-color-input', 'color', '', (event) => {
        this.carColor = event.target.value
      }),
      Tag.button('car-add-btn', 'create', async () => {
        await this.getLastCarId()
        this.createCar()
        parent.appendChild(Car(this.carName, this.carColor, this.carId))
      })
    );
    this.editCar = Tag.div(
      'edit-car',
      Tag.input('car-name-input', 'text', ``, () => {
        console.log(this.carName)
      }),
      Tag.input('car-color-input', 'color', ``, () => {
        console.log(this.carColor)
      }),
      Tag.button('car-add-btn', 'update', () => {
        
      })
    );

    this.appendChildren([this.addCar, this.editCar]);
      this.getCarData(id);
  }

  private async getLastCarId() {
    await Api.getCars().then((elem) => {
      if (elem.length > 0) { 
        this.carId = elem[elem.length - 1].id + 1;
      }
    }) 
  }

  private createCar() {
    Api.createCar({
      name: `${this.carName}`,
      color: `${this.carColor}`,
    });
  }

  getCarData(id) {
    Api.getCar(id).then((car) => {
      this.carName = car.name;
      this.carColor = car.color;
    })
  }

  updateCar(id, {}) {
    Api.updateCar(id, {})
  }
}

class addCarComponent extends Component {

  carName = 'Tesla';
  carColor = '#dcdcdc';
  carId = 1;
  constructor(parent: HTMLElement) {

    super(
      { className: 'add-car' },
    
      Tag.input('car-name-input', 'text', '', (event) => {
        console.log(event.target.value)
        this.carName = event.target.value;
     }),
      Tag.input('car-color-input', 'color', '', (event) => {
        console.log(event.target.value)
        this.carColor = event.target.value
      }),
      Tag.button('car-add-btn', 'create', async () => {
        await this.getLastCarId()
        this.createCar()
        parent.appendChild(Car(this.carName, this.carColor, this.carId));
      })
    )
  }

  private async getLastCarId() {
    await Api.getCars().then((elem) => {
      if (elem.length > 0) { 
        this.carId = elem[elem.length - 1].id + 1;
      }
    }) 
  }

  private createCar() {
    Api.createCar({
      name: `${this.carName}`,
      color: `${this.carColor}`,
    });
  }
}

class EditCarComponent extends Component {

  carName;
  carColor;
  carId = 1;

  private readonly carNameInput: Component;
  private readonly carColorInput: Component;
  private readonly updateButton: Component;
  
  constructor(name, color) {
    super({ className: 'edit-car' });
    this.name = name;
    this.color = name;
    
    this.carNameInput = Tag.input('car-name-input', 'text', '', (event) => {
      this.carName = event.target.value;
    });
    
    this.carColorInput = Tag.input('car-color-input', 'color', '', (event) => {
      this.carColor = event.target.value;
    });
    
    this.updateButton = Tag.button('car-update-btn', 'Update', async (event) => {

    });
    
    this.carNameInput.setAttribute('value', `${name}`)
    this.carColorInput.setAttribute('value', `${color}`)

    this.appendChildren([this.carNameInput, this.carColorInput, this.updateButton]);

    
  }

  async getCarData(id) {
    await Api.getCar(id).then((car) => {
      this.carName = car.name;
      this.carColor = car.color;
      console.log(this.carName);
      console.log(this.carColor);
      this.carNameInput.value = this.carName;
      this.carColorInput.value = this.carColor;
      console.log()
    })
  }
}

export const Controls = (parent) => new ControlsComponent(parent).getNode();
export const addCar = (parent) => new addCarComponent(parent).getNode();
export const editCar = (name, color) => new EditCarComponent(name, color).getNode();