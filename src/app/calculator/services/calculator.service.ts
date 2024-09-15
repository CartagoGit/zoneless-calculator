import { Injectable, signal } from '@angular/core';
import {
  INumbers,
  IOperators,
  isNumber,
  isOperator,
  ISpecialOperators,
  isPossibleValue,
  isSpecialOperator,
} from '../constants/calculatos.constants';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public resultText = signal('0');
  public subResultText = signal('');
  public lastOperator = signal('');
  private _limitCharacters = 9;

  public constructNumber(value: string): void {
    // Validamos que el valor sea válido
    if (!isPossibleValue(value)) return console.warn('Invalid value: ', value);
    if (this.resultText() === 'NaN') return this.resetValues();

    if (isSpecialOperator(value)) this._specialValue(value);
    else if (isOperator(value)) this._operatorValue(value);
    else if (isNumber(value)) this._numberValue(value);
  }

  private _isOverLimitLength(): boolean {
    if (this.resultText().length >= this._limitCharacters) {
      console.warn('Max length reached');
      return true;
    }
    return false;
  }

  private _specialValue(value: ISpecialOperators): void {
    // Si se pulsa C nos da igual lo que haya en pantalla, reseteamos los valores
    if (value === 'C') return this.resetValues();

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

    //Validar si decimal
    if (value === '.' && !this.resultText().includes('.')) {
      // Limitamos el tamaño
      if (this._isOverLimitLength()) return;
      return this.resultText.update((prev) => prev + value);
    }
  }

  private _operatorValue(value: IOperators): void {
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
      return;
    }
    this.subResultText.set(result.toString());

    this.lastOperator.set(value);
    this.resultText.set('0');
    return;
  }

  private _numberValue(value: INumbers): void {
    // Si ya hemos dado un resultado y volvemos a presionar un número, reseteamos los valores
    if (this.lastOperator() === '=') this.resetValues();
    // Limitar cantidad de caracteres
    if (this._isOverLimitLength()) return;
    // Evitar el 0 a la izquierda y añadir el valor
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
