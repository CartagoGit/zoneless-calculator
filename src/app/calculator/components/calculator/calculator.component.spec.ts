import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';

describe('CalculatorButtonComponent', () => {
  let fixture: ComponentFixture<CalculatorComponent>;
  let component: CalculatorComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle click when handleKeyboardEvent is called', () => {
    spyOn(component, 'handleClick');
    component.handleKeyboardEvent(new KeyboardEvent('keyup', { key: '1' }));
    expect(component.handleClick).toHaveBeenCalled();
  });

  it('should prevent default when handleKeyboardEvent is called', () => {
    const event = new KeyboardEvent('keyup', { key: '1' });
    spyOn(event, 'preventDefault');
    component.handleKeyboardEvent(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should handle correctly the dictionary when handleKeyboardEvent is called', () => {
    spyOn(component, 'handleClick');
    component.handleKeyboardEvent(new KeyboardEvent('keyup', { key: 'x' }));
    expect(component.handleClick).toHaveBeenCalledWith('*');

    component.handleKeyboardEvent(new KeyboardEvent('keyup', { key: 'c' }));
    expect(component.handleClick).toHaveBeenCalledWith('C');

    component.handleKeyboardEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    expect(component.handleClick).toHaveBeenCalledWith('=');

    component.handleKeyboardEvent(new KeyboardEvent('keyup', { key: ',' }));
    expect(component.handleClick).toHaveBeenCalledWith('.');

    component.handleKeyboardEvent(new KeyboardEvent('keyup', { key: '/' }));
    expect(component.handleClick).toHaveBeenCalledWith('÷');

    component.handleKeyboardEvent(new KeyboardEvent('keyup', { key: 'a' }));
    expect(component.handleClick).toHaveBeenCalledWith('a');

    component.handleKeyboardEvent(
      new KeyboardEvent('keyup', { key: 'Escape' })
    );
    expect(component.handleClick).toHaveBeenCalledWith('C');

    component.handleKeyboardEvent(new KeyboardEvent('keyup', { key: 'Clear' }));
    expect(component.handleClick).toHaveBeenCalledWith('C');
  });

  it("should transform '÷' to '/' when handleClick is called", () => {
    spyOn(component['_calculatorSvc'], 'constructNumber');
    component.handleClick('÷');
    expect(component['_calculatorSvc'].constructNumber).toHaveBeenCalledWith(
      '/'
    );
  });

  it('should computed resultText when resultText is called', () => {
    expect(component.resultText()).toBe('0');
    component.handleClick('1');
    component.handleClick('2');
    expect(component.resultText()).toBe('12');
  });

  it('should computed subResultText when subResultText is called', () => {
    expect(component.subResultText()).toBe('');
    component.handleClick('1');
    component.handleClick('2');
    component.handleClick('+');
    expect(component.subResultText()).toBe('12');
  });

  it('should computed lastOperator when lastOperator is called', () => {
    expect(component.lastOperator()).toBe('');
    component.handleClick('1');
    component.handleClick('2');
    component.handleClick('+');
    expect(component.lastOperator()).toBe('+');
  });
});
