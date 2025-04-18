import LoginPage from './pages/login';

class App {
  private container = document.body;

  public run(): void {
    const loginPage = new LoginPage();
    this.container.append(loginPage.render());
  }
}

export default App;
