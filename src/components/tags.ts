import Component from "./components";
import Button from "./button";
import Input from "./input";

class Tag {

  public static main(className: string, ...children: Component[]): Component {
    return new Component({ tag: 'main', className }, ...children);
  }

  public static div(className: string, ...children: Component[]): Component {
    return new Component({ tag: 'div', className }, ...children);
  }
  
  public static button(className: string, text: string, onClick?: (event: Event) => void): Component {
    return new Button({ className, text, onClick });
  }
  
  public static input(className: string, type: string, value?: string, onChange?: (event: Event) => void): Component {
    return new Input({ className, type, value, onChange });
  }
  
  public static h1(className: string, text?: string): Component {
    return new Component({ tag: 'h1', className, text });
  }

  public static h2(className: string, text?: string): Component {
    return new Component({ tag: 'h2', className, text });
  }
  
  public static h3(className: string, text?: string): Component {
    return new Component({ tag: 'h3', className, text });
  }

  public static h4(className: string, text?: string): Component {
    return new Component({ tag: 'h4', className, text });
  }
}

export default Tag;