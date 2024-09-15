import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  viewChildren,
} from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)',
  },
})
export class CalculatorComponent {
  private _calculatorSvc = inject(CalculatorService);

  public calculatorButtons = viewChildren(CalculatorButtonComponent);

  public resultText = computed(() => this._calculatorSvc.resultText());
  public subResultText = computed(() => this._calculatorSvc.subResultText());
  public lastOperator = computed(() => this._calculatorSvc.lastOperator());

  handleClick(key: string) {
    // Parseamos el valor de división antes de nada
    if (key === '÷') key = '/';
    this._calculatorSvc.constructNumber(key);
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    event.preventDefault();
    const key = event.key.toLowerCase();
    const keyDictionary: Record<string, string> = {
      escape: 'C',
      clear: 'C',
      c: 'C',
      enter: '=',
      x: '*',
      ',': '.',
      '/': '÷',
    };
    const keyEquivalent = keyDictionary[key] ?? key;
    this.handleClick(keyEquivalent);
    this.calculatorButtons().forEach((button) => {
      button.keyboardPressedStyle(keyEquivalent);
    });
  }
}
