class Socket {
  private url = 'ws://127.0.0.1:4000';
  private webSocket = new WebSocket(this.url);
  private isConnected: Promise<void> | undefined;

  constructor() {
    this.init();
  }

  public init(): void {
    this.isConnected = new Promise<void>((resolve) => {
      this.webSocket.addEventListener('open', () => {
        console.log('WebSocket connection open.');
        resolve();
      });

      this.webSocket.addEventListener('message', (event) => {
        this.handleResponse(event.data);
      });
    });
  }

  public async sendLoginRequest(id: string, login: string, password: string): Promise<void> {
    await this.isConnected;
    const request = {
      id: id,
      type: 'USER_LOGIN',
      payload: {
        user: {
          login: login,
          password: password,
        },
      },
    };
    this.webSocket.send(JSON.stringify(request));
  }

  public async sendLogoutRequest(id: string, login: string, password: string): Promise<void> {
    await this.isConnected;
    const request = {
      id: id,
      type: 'USER_LOGOUT',
      payload: {
        user: {
          login: login,
          password: password,
        },
      },
    };
    this.webSocket.send(JSON.stringify(request));
  }

  public async sendUsersRequest(id: string, type: string): Promise<void> {
    await this.isConnected;
    const request = {
      id: id,
      type: type,
      payload: {},
    };
    this.webSocket.send(JSON.stringify(request));
  }

  private handleResponse(data: string): void {
    const response = JSON.parse(data);

    if (response.type === 'USER_ACTIVE') {
      const users = response.payload.users;
      console.log(users);
    }

    if (response.type === 'USER_INACTIVE') {
      const users = response.payload.users;
      console.log(users);
    }
  }
}

export default Socket;
