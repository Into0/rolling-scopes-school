import ButtonComponent from './button/button';
import Component from './component';
import InputComponent from './input/input';
import LinkComponent from './link/link';
import ImgComponent from './img/img';

export const main = (className: string, ...children: Component[]): Component =>
  new Component({ tag: 'main', className }, ...children);

export const div = (className: string, ...children: Component[]): Component =>
  new Component({ className }, ...children);

export const h1 = (className: string, text: string): Component => new Component({ tag: 'h1', className, text });

export const h2 = (className: string, text: string): Component => new Component({ tag: 'h2', className, text });

export const h3 = (className: string, text: string): Component => new Component({ tag: 'h3', className, text });

export const a = (className: string, href: string, text: string): Component =>
  new LinkComponent({ className, href, text });

export const span = (className: string, text: string): Component => new Component({ tag: 'span', className, text });

export const form = (className: string, ...children: Component[]): Component =>
  new Component({ tag: 'form', className }, ...children);

export const section = (className: string, ...children: Component[]): Component =>
  new Component({ tag: 'section', className }, ...children);

export const article = (className: string, ...children: Component[]): Component =>
  new Component({ tag: 'article', className }, ...children);

export const aside = (className: string, ...children: Component[]): Component =>
  new Component({ tag: 'aside', className }, ...children);

export const fieldset = (className: string, ...children: Component[]): Component =>
  new Component({ tag: 'fieldset', className }, ...children);

export const label = (text: string, ...children: Component[]): Component =>
  new Component({ tag: 'label', text }, ...children);

export const img = (className: string, source: string): Component => new ImgComponent({ className, source });

export const ul = (className: string, ...children: Component[]): Component =>
  new Component({ tag: 'ul', className }, ...children);

export const input = (
  className: string,
  type: string,
  placeholder: string,
  onChange?: (event: Event) => void,
): Component => new InputComponent({ className, type, placeholder, onChange });

export const button = (
  className: string,
  text: string,
  type: string,
  onClick: (event: Event) => void,
  disabled?: string,
): Component => new ButtonComponent({ className, text, type, onClick, disabled });
