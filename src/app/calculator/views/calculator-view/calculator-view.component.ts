import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'calculator-view',
  standalone: true,
  imports: [],
  templateUrl: './calculator-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CalculatorViewComponent {}
