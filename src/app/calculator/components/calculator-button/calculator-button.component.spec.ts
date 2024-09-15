import { signal, input } from '@angular/core';
import { CalculatorButtonComponent } from './calculator-button.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

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
});
