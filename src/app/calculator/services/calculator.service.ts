import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/'];
const specialOperators = ['C', '%', '+/-', '=', '.', 'backspace'];
const possibleValues = [...numbers, ...operators, ...specialOperators] as const;

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  public constructNumber(value: string): void {
    console.log({ value });
    if (!possibleValues.includes(value))
      return console.warn('Invalid value: ', value);

    if (value === '=') {
      // TODO
      console.log('Calcular resultado');
      return;
    }

    if (value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    if (value === 'backspace') {
      if (this.resultText() === '0') return;
      if (this.resultText().length === 1) return this.resultText.set('0');
      this.resultText.update((prev) => prev.slice(0, -1));
      return;
    }

    // Aplicar operador
    if (operators.includes(value)) {
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    //Validar si decimal
    if (value === '.' && !this.resultText().includes('.'))
      return this.resultText.update((prev) => prev + value);

    if (numbers.includes(value))
      return this.resultText.update((prev) =>
        prev === '0' ? value : prev + value
      );
  }
}
