// Constantes y tipos para los numeros de la calculadora
export const numbers = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
] as const;
export type INumbers = (typeof numbers)[number];
export const isNumber = (value: string): value is INumbers =>
  numbers.includes(value as INumbers);

// Constantes y tipos para los operadores de la calculadora
export const operators = ['+', '-', '*', '/'] as const;
export type IOperators = (typeof operators)[number];
export const isOperator = (value: string): value is IOperators =>
  operators.includes(value as IOperators);

// Constantes y tipos para los valores especiales de la calculadora
export const specialOperators = [
  'C',
  '%',
  '+/-',
  '=',
  '.',
  'backspace',
] as const;
export type ISpecialOperators = (typeof specialOperators)[number];
export const isSpecialOperator = (value: string): value is ISpecialOperators =>
  specialOperators.includes(value as ISpecialOperators);

// Constantes y tipos para todos los posibles valores de la calculadora
export const possibleValues = [
  ...numbers,
  ...operators,
  ...specialOperators,
] as const;
export type IPossibleValues = (typeof possibleValues)[number];
export const isPossibleValue = (value: string): value is IPossibleValues =>
  possibleValues.includes(value as IPossibleValues);
