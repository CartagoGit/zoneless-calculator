import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calculator-button.component.css'],
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
  },
})
export class CalculatorButtonComponent {
  // Siempre viene como un string, pero puede ser 'false' o 'true', transformamos el valor de la señal para que sea un booleano
  private _transformBoolean = (value: string | boolean) => {
    return typeof value === 'string' ? value !== 'false' : value;
  };

  public isPressed = signal(false);

  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  public isCommand = input(false, {
    transform: this._transformBoolean,
  });
  public isDoubleSize = input(false, {
    transform: this._transformBoolean,
  });

  @HostBinding('class.is-command')
  get isCommandClass() {
    return this.isCommand();
  }

  @HostBinding('class.is-double-size')
  get isDoubleSizeClass() {
    return this.isDoubleSize();
  }
  @HostBinding('class.is-pressed')
  get isPressedClass() {
    return this.isPressed();
  }

  handleClick() {
    const content = this.contentValue()?.nativeElement.innerText.trim();
    if (!content) return;
    this.onClick.emit(content);
  }

  keyboardPressedStyle(key: string) {
    const content = this.contentValue()?.nativeElement.innerText.trim();
    if (!content || key !== content) return;
    this.isPressed.set(true);
    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);
  }
}
