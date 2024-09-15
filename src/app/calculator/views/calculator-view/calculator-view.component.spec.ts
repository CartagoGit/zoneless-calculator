import { ComponentFixture, TestBed } from '@angular/core/testing';
import CalculatorViewComponent from './calculator-view.component';

describe('CalculatorViewComponent', () => {
  let fixture: ComponentFixture<CalculatorViewComponent>;
  let component: CalculatorViewComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorViewComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render calculator component', () => {
    expect(compiled.querySelector('calculator')).toBeTruthy();
  });

  it('should render calculator component wrapped with classes', () => {
    const wrapper = compiled.querySelector('div');
    const mustHaveClasses =
      'w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(
        ' '
      );

    const wrapperClasses = wrapper?.classList.value.split(' ');

    expect(wrapper).not.toBeNull();
    mustHaveClasses.forEach((className) => {
      expect(wrapperClasses).toContain(className);
    });
  });
});
