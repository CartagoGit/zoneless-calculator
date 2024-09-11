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
  private _limitCharacters = 9;

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

    if (value === '+/-') {
      return this.resultText.update((prev) =>
        prev.startsWith('-') ? prev.slice(1) : '-' + prev
      );
    }

    if (value === 'backspace') {
      if (this.resultText() === '0') return;
      if (this.resultText().length === 1) return this.resultText.set('0');
      this.resultText.update((prev) => prev.slice(0, -1));
      return;
    }

    // Aplicar operador
    if (operators.includes(value)) {
      this.subResultText.set(this._calculateResult().toString());
      this.lastOperator.set(value);
      this.resultText.set('0');
      return;
    }

    // Limitar cantidad de caracteres
    if (this.resultText().length > this._limitCharacters)
      return console.warn('Max length reached');

    //Validar si decimal
    if (value === '.' && !this.resultText().includes('.'))
      return this.resultText.update((prev) => prev + value);

    if (numbers.includes(value))
      return this.resultText.update((prev) =>
        prev === '0' || prev === '-0' ? value : prev + value
      );
  }

  private _calculateResult(): number {
    const operations: Record<string, (...args: number[]) => number> = {
      '*': (a: number, b: number) => a * b,
      '/': (a: number, b: number) => a / b,
      '+': (a: number, b: number) => a + b,
      '-': (a: number, b: number) => a - b,
    };

    const result = operations[this.lastOperator()](
      +this.subResultText(),
      +this.resultText()
    );

    // Evitamos el deprecamiento de punto flotante de js
    return parseFloat(result.toFixed(this._limitCharacters));
  }
}
