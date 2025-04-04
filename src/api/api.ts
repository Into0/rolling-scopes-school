class Api {
  static baseUrl = 'http://127.0.0.1:3000';
  static garage = `${this.baseUrl}/garage`;
  static engine = `${this.baseUrl}/engine`;
  static winners = `${this.baseUrl}/winners`;

  static totalCars: number;
  static totalWinners: number;

  constructor() {}

  static async getCars(page?: number, limit = 7) {
    const response = await fetch(`${this.garage}?_page=${page}&_limit=${limit}`, { method: 'GET' });
    this.totalCars = Number(response.headers.get('X-Total-count'));
    return response.json();
  }

  static async getCar(id: number) {
    await fetch(`${this.garage}/${id}`, { method: 'GET' });
  }

  static async createCar(obj: object) {
    await fetch(`${this.garage}`, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }

  static async deleteCar(id: number) {
    await fetch(`${this.garage}/${id}`, { method: 'DELETE' });
  }

  static async updateCar(id: number, obj: object) {
    await fetch(`${this.garage}/${id}`, { 
      method: 'PUT',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }

  static async startCarsEngine(id: number) {
    await fetch(`${this.engine}?id=${id}&status=started`, { method: 'PATCH' });
  }

  static async stopCarsEngine(id: number) {
    await fetch(`${this.engine}?id=${id}&status=stopped`, { method: 'PATCH' });
  }

  static async switchCarsEngine(id: number) {
    await fetch(`${this.engine}?id=${id}&status=drive`, { method: 'PATCH' });
  }

  static async getWinners(page?: number, limit = 10) {
    const response = await fetch(`${this.winners}?_page=${page}&_limit=${limit}`, { method: 'GET' });
    this.totalWinners = Number(response.headers.get('X-Total-count'));
    return response.json();
  }

  static async getWinner(id: number) {
    await fetch(`${this.winners}/${id}`, { method: 'GET' });
  }

  static async createWinner(obj: object) {
    await fetch(`${this.winners}`, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }

  static async deleteWinner(id: number) {
    await fetch(`${this.winners}/${id}`, { method: 'DELETE' });
  }

  static async updateWinner(id: number, obj: object) {
    await fetch(`${this.winners}/${id}`, { 
      method: 'PUT',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }

}

export default Api;