class Api {
  public static baseUrl = 'http://127.0.0.1:3000';
  public static garage = `${this.baseUrl}/garage`;
  public static engine = `${this.baseUrl}/engine`;
  public static winners = `${this.baseUrl}/winners`;

  public static totalCars: number;
  public static totalWinners: number;

  constructor() {}

  public static async getCars(page?: number, limit = 7): Promise<Response> {
    const response = await fetch(`${this.garage}?_page=${page}&_limit=${limit}`, { method: 'GET' });
    this.totalCars = Number(response.headers.get('X-Total-count'));
    return response.json();
  }

  public static async getCar(id: number): Promise<void> {
    return (await fetch(`${this.garage}/${id}`, { method: 'GET' })).json();
  }

  public static async createCar(object: object): Promise<void> {
    await fetch(`${this.garage}`, {
      method: 'POST',
      body: JSON.stringify(object),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public static async deleteCar(id: number): Promise<void> {
    await fetch(`${this.garage}/${id}`, { method: 'DELETE' });
  }

  public static async updateCar(id: number, object: object): Promise<void> {
    await fetch(`${this.garage}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(object),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public static async startCarsEngine(id: number): Promise<void> {
    await fetch(`${this.engine}?id=${id}&status=started`, { method: 'PATCH' });
  }

  public static async stopCarsEngine(id: number): Promise<void> {
    await fetch(`${this.engine}?id=${id}&status=stopped`, { method: 'PATCH' });
  }

  public static async switchCarsEngine(id: number): Promise<void> {
    await fetch(`${this.engine}?id=${id}&status=drive`, { method: 'PATCH' });
  }

  public static async getWinners(page?: number, limit = 10): Promise<Response> {
    const response = await fetch(`${this.winners}?_page=${page}&_limit=${limit}`, { method: 'GET' });
    this.totalWinners = Number(response.headers.get('X-Total-count'));
    return response.json();
  }

  public static async getWinner(id: number): Promise<void> {
    await fetch(`${this.winners}/${id}`, { method: 'GET' });
  }

  public static async createWinner(object: object): Promise<void> {
    await fetch(`${this.winners}`, {
      method: 'POST',
      body: JSON.stringify(object),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public static async deleteWinner(id: number): Promise<void> {
    await fetch(`${this.winners}/${id}`, { method: 'DELETE' });
  }

  public static async updateWinner(id: number, object: object): Promise<void> {
    await fetch(`${this.winners}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(object),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export default Api;
