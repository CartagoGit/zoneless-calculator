import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  viewChildren,
} from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

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
  public calculatorButtons = viewChildren(CalculatorButtonComponent);

  handleClick(key: string) {
    console.log({ key });
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
