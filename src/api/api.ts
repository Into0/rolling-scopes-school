class Api {
  baseUrl = 'localhost:3000';
  garage = `${this.baseUrl}/garage`;
  winners = `${this.baseUrl}/winners`;
  allCars = 0;
  constructor () {}

  async getCars(page: number, limit = 7) {
    const response = await fetch(`${this.garage}?_page=${page}&_limit=${limit}`, { method: 'GET' });
    this.allCars = Number(response.headers.get('X-Total-count'));
  
    return response.json();
  }

  getCar() {
    
  }

  createCar() {

  }

  deleteCar() {

  }

  updateCar() {

  }

  startCarsEngine() {

  }

  switchCarsEngine() {

  }

  getWinners() {

  }

  getWinner() {

  }

  createWinner() {

  }

  deleteWinner() {

  }

  updateWinner() {

  }

}

export default Api;