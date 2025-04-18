import ButtonComponent from './button';
import Component from './component';
import InputComponent from './input';
import LinkComponent from './link';

export const main = (className: string, ...children: Component[]): Component =>
  new Component({ tag: 'main', className }, ...children);

export const div = (className: string, ...children: Component[]): Component =>
  new Component({ tag: 'div', className }, ...children);

export const h1 = (className: string, text: string): Component => new Component({ tag: 'h1', className, text });

export const h2 = (className: string, text: string): Component => new Component({ tag: 'h2', className, text });

export const h3 = (className: string, text: string): Component => new Component({ tag: 'h3', className, text });

export const a = (className: string, href: string, text: string): Component =>
  new LinkComponent({ className, href, text });

export const form = (className: string, ...children: Component[]): Component =>
  new Component({ tag: 'form', className }, ...children);

export const fieldset = (className: string, ...children: Component[]): Component =>
  new Component({ tag: 'fieldset', className }, ...children);

export const label = (text: string, ...children: Component[]): Component =>
  new Component({ tag: 'label', text }, ...children);

export const input = (
  className: string,
  type: string,
  placeholder: string,
  onChange: (event: Event) => void,
): Component => new InputComponent({ className, type, placeholder, onChange });

export const button = (className: string, text: string, type: string, onClick: (event: Event) => void): Component =>
  new ButtonComponent({ className, text, type, onClick });
