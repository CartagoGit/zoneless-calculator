import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "(document:keyup)": "handleKeyboardEvent($event)"
  }
})
export class CalculatorComponent {
  handleClick(key: string) {
    console.log({ key });
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    event.preventDefault();
    const key = event.key;
    this.handleClick(key);
  }
}
