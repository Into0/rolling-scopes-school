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

// Define an interface for Label options
export interface LabelOptions {
  className?: string;
  labelFor: string;
}
