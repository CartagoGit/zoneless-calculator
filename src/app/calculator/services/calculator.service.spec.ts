import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('Svc => CalculatorService}', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with default values', () => {
    expect(service.resultText()).toBe('0');
    expect(service.lastOperator()).toBe('');
    expect(service.subResultText()).toBe('');
  });

  it("should set resultTest to '0' and lastOperator and subResultText to '' when C is pressed", () => {
    service.resultText.set('123');
    service.lastOperator.set('/');
    service.subResultText.set('456');

    service.constructNumber('C');

    expect(service.resultText()).toBe('0');
    expect(service.lastOperator()).toBe('');
    expect(service.subResultText()).toBe('');
  });
});
