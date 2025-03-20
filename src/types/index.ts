export interface ButtonOptions {
  className?: string;
  text?: string;
  onClick?: (event: Event) => void;
}

export interface InputOptions {
  className?: string;
  type: string;
  placeholder?: string;
  name?: string;
}

export interface LabelOptions {
  className?: string;
  text?: string;
  labelFor?: string;
}
