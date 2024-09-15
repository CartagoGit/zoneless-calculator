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
  public subResultText = signal('');
  public lastOperator = signal('');
  private _limitCharacters = 9;

  public constructNumber(value: string): void {
    // Parseamos el valor de división antes de nada
    if (value === '÷') value = '/';

    // Validamos que el valor sea correcto
    if (!possibleValues.includes(value))
      return console.warn('Invalid value: ', value);

    // Si se pulsa C nos da igual lo que haya en pantalla, reseteamos los valores
    if (value === 'C') return this.resetValues();

    // Si ya hemos dado un resultado y volvemos a presionar un número, reseteamos los valores
    if (numbers.includes(value) && this.lastOperator() === '=')
      this.resetValues();

    if (value === '=') {
      if (this.lastOperator() === '' || this.lastOperator() === '=') return;
      this.resultText.set(this._calculateResult().toString());
      this.subResultText.set('');
      this.lastOperator.set('=');
      return;
    }

    if (value === '%') {
      // Si no existe un operador, simplemente resetea el resultado
      if (['', '='].some((val) => val === this.lastOperator()))
        return this.resultText.set('0');
      // Si el operador es una multiplicación o división, calculamos el porcentaje
      else if (['*', '/'].some((val) => val === this.lastOperator()))
        return this.resultText.update((result) => (+result / 100).toString());
      else if (['+', '-'].some((val) => val === this.lastOperator()))
        return this.resultText.update((result) =>
          ((+this.subResultText() * +result) / 100).toString()
        );
    }

    if (value === '+/-') {
      return this.resultText.update((prev) =>
        prev.startsWith('-') ? prev.slice(1) : '-' + prev
      );
    }

    if (value === 'backspace') {
      if (this.resultText() === '0') return;
      if (
        this.resultText().length === 1 ||
        (this.resultText().length === 2 && this.resultText()[0] === '-')
      ) {
        return this.resultText.set('0');
      }
      this.resultText.update((prev) => prev.slice(0, -1));
      return;
    }

    // Aplicar operador
    if (operators.includes(value)) {
      if (this.lastOperator() === '' || this.lastOperator() === '=') {
        this.subResultText.set(this.resultText());
        this.lastOperator.set(value);
        this.resultText.set('0');
        return;
      }
      const result = this._calculateResult();
      if (isNaN(result)) {
        this.resetValues();
        this.resultText.set(result.toString());
      }
      this.subResultText.set(result.toString());
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

    // Evitar el 0 a la izquierda y añadir el valor
    if (numbers.includes(value))
      return this.resultText.update((prev) =>
        prev === '0' || prev === '-0' ? value : prev + value
      );
  }

  // Retorna el valor de la operación
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

  // Resetea los valores
  public resetValues(): void {
    this.resultText.set('0');
    this.subResultText.set('');
    this.lastOperator.set('');
  }
}
