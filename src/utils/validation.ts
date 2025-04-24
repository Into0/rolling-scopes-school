import type Component from '../components/component';
import { label } from '../components/elements/tags';

export interface ValidationResult {
  isValid: boolean;
  errorLabel?: Component;
}

export const validateUsername = (value: string): ValidationResult => {
  const regex = new RegExp(/[^a-zA-Z0-9]/g);
  let errorLabel;

  switch (true) {
    case regex.test(value): {
      errorLabel = label('only letters and numbers are allowed.');
      return { isValid: false, errorLabel };
    }

    case value.length < 3: {
      errorLabel = label('name is too short. minimum 3 characters required.');
      return { isValid: false, errorLabel };
    }

    case value.length > 12: {
      errorLabel = label('name is too long. maximum 12 characters allowed.');
      return { isValid: false, errorLabel };
    }
  }

  return { isValid: true, errorLabel: undefined };
};

export const validatePassword = (value: string): ValidationResult => {
  const regex = new RegExp(/[^a-zA-Z0-9]/g);
  let errorLabel;

  switch (true) {
    case regex.test(value): {
      errorLabel = label('only letters and numbers are allowed.');
      return { isValid: false, errorLabel };
    }

    case value.length < 6: {
      errorLabel = label('pass is too short. minimum 6 characters required.');
      return { isValid: false, errorLabel };
    }

    case value.length > 24: {
      errorLabel = label('pass is too long. maximum 24 characters allowed.');
      return { isValid: false, errorLabel };
    }
  }

  return { isValid: true, errorLabel: undefined };
};
