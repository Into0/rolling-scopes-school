class Socket {
  public lastError?: string;
  public userLogined?: boolean;
  public url = 'ws://127.0.0.1:4000';

  private isConnected: Promise<void> | undefined;
  private webSocket: WebSocket | undefined;

  constructor() {
    this.init();
  }

  public init(): void {
    this.webSocket = new WebSocket(this.url);
    this.isConnected = new Promise<void>((resolve) => {
      this.webSocket?.addEventListener('open', () => {
        resolve();
      });

      this.webSocket?.addEventListener('message', (event) => {
        this.handleResponse(event.data);
      });

      this.webSocket?.addEventListener('close', () => {
        setTimeout(() => {
          this.init();
        }, 1000);
      });

      this.webSocket?.addEventListener('error', () => {
        this.webSocket?.close();
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
    this.webSocket?.send(JSON.stringify(request));
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
    this.webSocket?.send(JSON.stringify(request));
  }

  public async sendUsersRequest(id: string, type: string): Promise<void> {
    await this.isConnected;
    const request = {
      id: id,
      type: type,
      payload: {},
    };
    this.webSocket?.send(JSON.stringify(request));
  }

  private handleResponse(data: string): void {
    const response = JSON.parse(data);

    switch (response.type) {
      case 'ERROR': {
        this.lastError = response.payload.error;
        break;
      }

      case 'USER_LOGIN': {
        const isLogined = response.payload.user.isLogined;
        this.userLogined = isLogined;
        break;
      }
    }
  }
}

export default Socket;
