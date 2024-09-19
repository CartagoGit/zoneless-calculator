import { Component } from '@angular/core';
import { CalculatorButtonComponent } from './calculator-button.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  imports: [CalculatorButtonComponent],
  standalone: true,
  template: `
    <calculator-button>
      <span>
        contenido proyectado
      </span>
    </calculator-button>
  `,
})
class TestHostComponent {}

describe('CalculatorButtonComponent', () => {
  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let component: CalculatorButtonComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorButtonComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply class w-1/4 if doubleSize is false', () => {
    const hostClasses = compiled?.classList.value.split(' ');
    expect(hostClasses).toContain('w-1/4');
    expect(component.isDoubleSize()).toBe(false);
  });

  it('should apply class w-2/4 if doubleSize is true', () => {
    fixture.componentRef.setInput('isDoubleSize', true);
    fixture.detectChanges();
    const hostClasses = compiled?.classList.value.split(' ');
    expect(hostClasses).toContain('is-double-size');
    expect(component.isDoubleSize()).toBe(true);
  });

  it('should emit when click on button', () => {
    // component.contentValue()!.nativeElement.innerText = '';
    spyOn(component.onClick, 'emit');
    component.handleClick();
    expect(component.onClick.emit).toHaveBeenCalled();
  });

  it("should set isPressed to true when keyboardPressedStyle is called with the button's content", (done) => {
    component.contentValue()!.nativeElement.innerText = '1';
    component.keyboardPressedStyle('1');
    expect(component.isPressed()).toBe(true);
    setTimeout(() => {
      expect(component.isPressed()).toBe(false);
      done();
    }, 101);
  });

  it('should display the projected content', () => {
    const hostComponentFixture = TestBed.createComponent(TestHostComponent);
    const compiled = hostComponentFixture.nativeElement as HTMLDivElement;

    expect(compiled.querySelector('button')?.innerText).toBe(
      `contenido proyectado`
    );
    expect(compiled.querySelector('button')?.children).toHaveSize(1); // solo tiene un hijo
    expect(compiled.querySelector('button')?.children[0].tagName).toBe('SPAN'); // el hijo es un span
  });
});
